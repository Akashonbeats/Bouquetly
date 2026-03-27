/**
 * Bouquet state encoder/decoder for shareable URLs.
 * Uses compact keys and shorter encoding to keep URLs small.
 */

// Map flower IDs to short 2-letter codes and back
const FLOWER_SHORT = {
  tulip: "tu",
  sunflower: "su",
  carnation: "ca",
  daisy: "da",
  peony: "pe",
  rose: "ro",
  anemone: "an",
  dahlia: "dh",
  lily: "li",
  orchid: "or",
  ranunculus: "ra",
  zinnia: "zi",
};
const SHORT_FLOWER = Object.fromEntries(
  Object.entries(FLOWER_SHORT).map(([k, v]) => [v, k]),
);

// Map bouquet type IDs to single chars
const TYPE_SHORT = { meadow: "m", garden: "g", botanical: "b" };
const SHORT_TYPE = { m: "meadow", g: "garden", b: "botanical" };

export function encodeBouquet(state) {
  const compact = [
    state.selectedFlowers
      .map((f) => FLOWER_SHORT[f] || f.slice(0, 2))
      .join(","),
    TYPE_SHORT[state.bouquetType] || "m",
    state.note.to || "",
    state.note.message || "",
    state.note.from || "",
  ].join("|");

  return btoa(unescape(encodeURIComponent(compact)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeBouquet(encoded) {
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const raw = decodeURIComponent(escape(atob(padded)));
    const parts = raw.split("|");

    const flowerCodes = parts[0].split(",");
    const selectedFlowers = flowerCodes.map((c) => SHORT_FLOWER[c] || c);

    return {
      selectedFlowers,
      bouquetType: SHORT_TYPE[parts[1]] || "meadow",
      note: {
        to: parts[2] || "",
        message: parts[3] || "",
        from: parts[4] || "",
      },
    };
  } catch {
    return null;
  }
}
