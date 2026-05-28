import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const ogImageUrl = id 
    ? `${protocol}://${host}/api/bouquet-image?id=${id}` 
    : `${protocol}://${host}/api/bouquet-image`;

  // 1. Decode the from name from the URL ID
  let fromName = '';
  try {
    if (id) {
      const padded = id.replace(/-/g, "+").replace(/_/g, "/");
      const raw = decodeURIComponent(escape(atob(padded)));
      const parts = raw.split("|");
      fromName = parts[4] || "";
    }
  } catch (e) {
    // Ignore decoding errors
  }

  const dynamicTitle = fromName 
    ? `${fromName} has made a bouquet for you.` 
    : `Bouquetly - Craft Digital Flower Bouquets`;

  const dynamicDescription = fromName
    ? `Bouquetly • Build a beautiful digital flower bouquet, add a personalized note, and share it with someone you love.`
    : `Build a beautiful digital flower bouquet, add a personalized note, and share it with someone you love via a unique link.`;

  // 2. Read the index.html file
  let htmlData = '';
  try {
    // Attempt to read from the local filesystem first (works well locally and sometimes on Vercel)
    let htmlPath = path.join(process.cwd(), 'dist', 'index.html');
    if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join(process.cwd(), 'index.html');
    }
    
    if (fs.existsSync(htmlPath)) {
       htmlData = fs.readFileSync(htmlPath, 'utf8');
    } else {
       // Fallback for strict serverless environments: fetch from our own host
       const response = await fetch(`${protocol}://${host}/index.html`);
       htmlData = await response.text();
    }

    // 3. Inject the dynamic OpenGraph tags
    htmlData = htmlData.replace(
      /<title>.*?<\/title>/i,
      `<title>${dynamicTitle}</title>`
    );

    htmlData = htmlData.replace(
      /<meta property="og:title" content=".*?"\s*\/>/i,
      `<meta property="og:title" content="${dynamicTitle}" />`
    );

    // Replace the default og:description and standard description with the dynamic one
    htmlData = htmlData.replace(
      /<meta name="description" content=".*?"\s*\/>/i,
      `<meta name="description" content="${dynamicDescription}" />`
    );
    htmlData = htmlData.replace(
      /<meta property="og:description" content=".*?"\s*\/>/i,
      `<meta property="og:description" content="${dynamicDescription}" />`
    );

    // Replace the default og:image and twitter:image tags with the dynamic ones
    htmlData = htmlData.replace(
      /<meta property="og:image" content=".*?"\s*\/>/i,
      `<meta property="og:image" content="${ogImageUrl}" />`
    );
    htmlData = htmlData.replace(
      /<meta name="twitter:image" content=".*?"\s*\/>/i,
      `<meta name="twitter:image" content="${ogImageUrl}" />`
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600');
    res.status(200).send(htmlData);
  } catch (error) {
    console.error('Error serving dynamic HTML:', error);
    res.status(500).send('Error rendering page.');
  }
}
