/**
 * Bouquet state encoder/decoder for shareable URLs.
 * Encodes bouquet config into a URL-safe base64 string.
 */

export function encodeBouquet(state) {
  const compact = {
    f: state.selectedFlowers,
    b: state.bouquetType,
    m: state.note.message,
    fr: state.note.from,
    to: state.note.to,
  };
  const json = JSON.stringify(compact);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function decodeBouquet(encoded) {
  try {
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(padded)));
    const compact = JSON.parse(json);
    return {
      selectedFlowers: compact.f || [],
      bouquetType: compact.b || 'meadow',
      note: {
        message: compact.m || '',
        from: compact.fr || '',
        to: compact.to || '',
      },
    };
  } catch {
    return null;
  }
}
