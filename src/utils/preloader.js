/**
 * Preloads all flower and bush images by creating Image objects.
 * Since Vite resolves these to hashed URLs at bundle time,
 * importing them here ensures the browser fetches them immediately
 * and caches them before any page needs them.
 *
 * Returns a Promise that resolves when ALL images have loaded (or errored).
 */
import tulipImg from '../assets/flowers/tulip.webp';
import sunflowerImg from '../assets/flowers/sunflower.webp';
import carnationImg from '../assets/flowers/carnation.webp';
import daisyImg from '../assets/flowers/daisy.webp';
import peonyImg from '../assets/flowers/peony.webp';
import roseImg from '../assets/flowers/rose.webp';
import anemoneImg from '../assets/flowers/anemone.webp';
import dahliaSrc from '../assets/flowers/dahlia.webp';
import lilyImg from '../assets/flowers/lily.webp';
import orchidImg from '../assets/flowers/orchid.webp';
import ranunculusImg from '../assets/flowers/ranunculus.webp';
import zinniaImg from '../assets/flowers/zinnia.webp';
import bush1 from '../assets/bushes/bush-1.png';
import bush1Top from '../assets/bushes/bush-1-top.png';
import bush2 from '../assets/bushes/bush-2.png';
import bush3 from '../assets/bushes/bush-3.png';

const ALL_IMAGES = [
  tulipImg, sunflowerImg, carnationImg, daisyImg, peonyImg, roseImg,
  anemoneImg, dahliaSrc, lilyImg, orchidImg, ranunculusImg, zinniaImg,
  bush1, bush1Top, bush2, bush3,
];

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // resolve even on error — don't block the app
    img.src = src;
  });
}

export function preloadAllImages() {
  return Promise.all(ALL_IMAGES.map(loadImage));
}
