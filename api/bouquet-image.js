import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Global cache for fonts to optimize performance
let fontBuffers = null;

async function loadGoogleFont(fontFamily, weight = 400) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@${weight}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-de) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
    }
  });
  const css = await response.text();
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/);
  if (match && match[1]) {
    const fontRes = await fetch(match[1]);
    return await fontRes.arrayBuffer();
  }
  throw new Error(`Failed to load font ${fontFamily} (${weight})`);
}

async function getFonts() {
  if (!fontBuffers) {
    try {
      const [playfairData, dancingData] = await Promise.all([
        loadGoogleFont('Playfair Display', 600),
        loadGoogleFont('Dancing Script', 600)
      ]);
      fontBuffers = { playfairData, dancingData };
    } catch (error) {
      console.error('Failed to load fonts dynamically, falling back to default', error);
      // Fallback is handled in ImageResponse options
      fontBuffers = { playfairData: null, dancingData: null };
    }
  }
  return fontBuffers;
}

function decodeBouquetData(id) {
  try {
    if (!id) return { toName: '', fromName: '' };
    const padded = id.replace(/-/g, "+").replace(/_/g, "/");
    const raw = decodeURIComponent(escape(atob(padded)));
    const parts = raw.split("|");
    return {
      toName: parts[2] || '',
      fromName: parts[4] || ''
    };
  } catch (e) {
    return { toName: '', fromName: '' };
  }
}

export default async function handler(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  let titleText = 'Craft Digital Flower Bouquets';
  let senderText = 'With love, from Bouquetly';

  if (id) {
    const { toName, fromName } = decodeBouquetData(id);
    if (fromName && toName) {
      titleText = `${toName}, a custom bouquet has been crafted for you`;
      senderText = `With love, from ${fromName}`;
    } else if (fromName) {
      titleText = 'A custom flower bouquet has been crafted for you';
      senderText = `With love, from ${fromName}`;
    } else if (toName) {
      titleText = `${toName}, a custom bouquet has been crafted for you`;
      senderText = 'Made with love';
    } else {
      titleText = 'A custom flower bouquet has been crafted for you';
      senderText = 'Made with love';
    }
  }

  // Retrieve custom fonts
  const fonts = await getFonts();
  const fontsOption = [];
  if (fonts.playfairData) {
    fontsOption.push({
      name: 'Playfair Display',
      data: fonts.playfairData,
      weight: 600,
      style: 'normal',
    });
  }
  if (fonts.dancingData) {
    fontsOption.push({
      name: 'Dancing Script',
      data: fonts.dancingData,
      weight: 600,
      style: 'normal',
    });
  }

  const element = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBFBE2 0%, #FFD9DF 100%)',
        padding: '30px',
        boxSizing: 'border-box',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(129, 81, 90, 0.25)',
              borderRadius: '16px',
              padding: '40px 60px',
              background: 'rgba(255, 255, 255, 0.45)',
              boxShadow: '0 8px 32px rgba(129, 81, 90, 0.05)',
              boxSizing: 'border-box',
            },
            children: [
              // Badge
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#3B6663',
                    letterSpacing: '8px',
                    marginBottom: '32px',
                    fontFamily: 'system-ui, sans-serif',
                    textTransform: 'uppercase',
                  },
                  children: 'Bouquetly',
                },
              },
              // Flower Emoji
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '84px',
                    marginBottom: '24px',
                  },
                  children: '💐',
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '42px',
                    fontWeight: '600',
                    color: '#81515A',
                    textAlign: 'center',
                    fontFamily: fonts.playfairData ? 'Playfair Display' : 'serif',
                    lineHeight: '1.35',
                    marginBottom: '16px',
                    maxWidth: '850px',
                  },
                  children: titleText,
                },
              },
              // Sender / From line
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '56px',
                    fontWeight: '600',
                    color: '#3B6663',
                    textAlign: 'center',
                    fontFamily: fonts.dancingData ? 'Dancing Script' : 'cursive',
                    marginTop: '12px',
                  },
                  children: senderText,
                },
              },
              // Button CTA
              {
                type: 'div',
                props: {
                  style: {
                    background: '#81515A',
                    color: '#FFFFFF',
                    borderRadius: '30px',
                    padding: '12px 36px',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: 'system-ui, sans-serif',
                    marginTop: '44px',
                    boxShadow: '0 4px 12px rgba(129, 81, 90, 0.12)',
                  },
                  children: 'Open Your Bouquet',
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: fontsOption.length > 0 ? fontsOption : undefined,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
