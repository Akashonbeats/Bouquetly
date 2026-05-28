import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Global cache for font to optimize performance
let fontBuffer = null;

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

async function getFont() {
  if (!fontBuffer) {
    try {
      fontBuffer = await loadGoogleFont('Dancing Script', 600);
    } catch (error) {
      console.error('Failed to load font dynamically, falling back to default', error);
      fontBuffer = null;
    }
  }
  return fontBuffer;
}

function decodeSenderName(id) {
  try {
    if (!id) return '';
    const padded = id.replace(/-/g, "+").replace(/_/g, "/");
    const raw = decodeURIComponent(escape(atob(padded)));
    const parts = raw.split("|");
    return parts[4] || ""; // Sender name is parts[4]
  } catch (e) {
    return '';
  }
}

export default async function handler(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  let displayText = '';
  let showBottomText = false;

  if (id) {
    const senderName = decodeSenderName(id) || 'Someone';
    displayText = `${senderName} has made a bouquet for you.`;
    showBottomText = true;
  } else {
    displayText = 'Bouquetly';
    showBottomText = false;
  }

  // Retrieve custom font
  const dancingData = await getFont();
  const fontsOption = [];
  if (dancingData) {
    fontsOption.push({
      name: 'Dancing Script',
      data: dancingData,
      weight: 600,
      style: 'normal',
    });
  }

  const children = [
    // Main Centered Text
    {
      type: 'div',
      props: {
        style: {
          fontSize: '76px',
          color: '#81515A',
          textAlign: 'center',
          fontFamily: dancingData ? 'Dancing Script' : 'cursive',
          lineHeight: '1.3',
          maxWidth: '1000px',
        },
        children: displayText,
      },
    }
  ];

  if (showBottomText) {
    children.push({
      type: 'div',
      props: {
        style: {
          position: 'absolute',
          bottom: '48px',
          fontSize: '32px',
          color: '#81515A',
          opacity: '0.45',
          fontFamily: dancingData ? 'Dancing Script' : 'cursive',
        },
        children: 'Bouquetly',
      },
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
        position: 'relative',
        boxSizing: 'border-box',
        padding: '60px',
      },
      children,
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
