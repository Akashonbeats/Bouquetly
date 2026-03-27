/**
 * Flower data — 12 hand-drawn watercolor flowers with image assets.
 */

// Flower images
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

// Bush / greenery images
import bush1 from '../assets/bushes/bush-1.png';
import bush1Top from '../assets/bushes/bush-1-top.png';
import bush2 from '../assets/bushes/bush-2.png';
import bush3 from '../assets/bushes/bush-3.png';

export const FLOWERS = [
  { id: 'tulip',       name: 'Tulip',       meaning: 'Perfect Love',      image: tulipImg },
  { id: 'sunflower',   name: 'Sunflower',   meaning: 'Pure Thoughts',     image: sunflowerImg },
  { id: 'carnation',   name: 'Carnation',   meaning: 'Fascination',       image: carnationImg },
  { id: 'daisy',       name: 'Daisy',       meaning: 'Innocence',         image: daisyImg },
  { id: 'peony',       name: 'Peony',       meaning: 'Happy Marriage',    image: peonyImg },
  { id: 'rose',        name: 'Rose',        meaning: 'Enduring Passion',  image: roseImg },
  { id: 'anemone',     name: 'Anemone',     meaning: 'Expectation',       image: anemoneImg },
  { id: 'dahlia',      name: 'Dahlia',      meaning: 'Elegance & Grace',  image: dahliaSrc },
  { id: 'lily',        name: 'Lily',        meaning: 'Purity & Beauty',   image: lilyImg },
  { id: 'orchid',      name: 'Orchid',      meaning: 'Luxury & Strength', image: orchidImg },
  { id: 'ranunculus',  name: 'Ranunculus',  meaning: 'Radiant Charm',     image: ranunculusImg },
  { id: 'zinnia',      name: 'Zinnia',      meaning: 'Lasting Affection', image: zinniaImg },
];

export const BUSHES = {
  bush1:    bush1,
  bush1Top: bush1Top,
  bush2:    bush2,
  bush3:    bush3,
};

export const BOUQUET_TYPES = [
  {
    id: 'meadow',
    name: 'Wild Meadow',
    description: 'Lush grasses with delicate pink accents',
    icon: '🌿',
    bush: bush1,
    bushTop: bush1Top,
  },
  {
    id: 'garden',
    name: 'Emerald Garden',
    description: 'Dense tropical foliage arrangement',
    icon: '🍃',
    bush: bush2,
    bushTop: null,
  },
  {
    id: 'botanical',
    name: 'Eucalyptus Dream',
    description: 'Elegant eucalyptus & fern sprays',
    icon: '🌱',
    bush: bush3,
    bushTop: null,
  },
];

export function getFlowerById(id) {
  return FLOWERS.find(f => f.id === id);
}
