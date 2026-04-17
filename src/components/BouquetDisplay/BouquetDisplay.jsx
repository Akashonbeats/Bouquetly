import './BouquetDisplay.css';
import { BOUQUET_TYPES, getFlowerById } from '../../utils/flowers';

// Positions for 4–7 flowers, centered around the bush
const POSITION_MAP = {
  4: [
    { x: 38, y: 32, scale: 1.1, rotate: -8 },
    { x: 62, y: 30, scale: 1.0, rotate: 10 },
    { x: 30, y: 50, scale: 0.95, rotate: -15 },
    { x: 65, y: 52, scale: 1.05, rotate: 5 },
  ],
  5: [
    { x: 50, y: 28, scale: 1.1, rotate: 0 },
    { x: 32, y: 38, scale: 1.0, rotate: -12 },
    { x: 68, y: 36, scale: 0.95, rotate: 14 },
    { x: 36, y: 54, scale: 1.0, rotate: -6 },
    { x: 64, y: 55, scale: 1.05, rotate: 8 },
  ],
  6: [
    { x: 42, y: 26, scale: 1.05, rotate: -5 },
    { x: 58, y: 25, scale: 1.0, rotate: 8 },
    { x: 28, y: 42, scale: 0.95, rotate: -14 },
    { x: 72, y: 40, scale: 1.0, rotate: 12 },
    { x: 35, y: 56, scale: 1.05, rotate: -8 },
    { x: 62, y: 58, scale: 0.9, rotate: 6 },
  ],
  7: [
    { x: 50, y: 24, scale: 1.1, rotate: 0 },
    { x: 32, y: 33, scale: 0.95, rotate: -10 },
    { x: 68, y: 31, scale: 1.0, rotate: 12 },
    { x: 24, y: 48, scale: 0.9, rotate: -16 },
    { x: 76, y: 46, scale: 0.95, rotate: 14 },
    { x: 38, y: 58, scale: 1.05, rotate: -6 },
    { x: 62, y: 60, scale: 1.0, rotate: 8 },
  ],
};

export default function BouquetDisplay({ selectedFlowers, bouquetType, size = 'large' }) {
  const flowers = selectedFlowers.map(id => getFlowerById(id)).filter(Boolean);
  const bushType = BOUQUET_TYPES.find(t => t.id === bouquetType) || BOUQUET_TYPES[0];
  const count = Math.min(flowers.length, 7);
  const positions = POSITION_MAP[count] || POSITION_MAP[4];
  const flowerSize = size === 'large' ? 90 : 65;

  return (
    <div className={`bouquet-display bouquet-display--${size}`}>
      <div className="bouquet-display__canvas">
        {/* Layer 1: Bush background */}
        <img
          src={bushType.bush}
          alt=""
          className="bouquet-display__bush bouquet-display__bush--back"
          draggable={false}
        />

        {/* Layer 2: Flower images — wrapper div for position, inner img for bounce */}
        {flowers.map((flower, i) => {
          const pos = positions[i] || { x: 50, y: 40, scale: 1, rotate: 0 };
          const duration = 6 + (i % 4) * 0.9;
          const delay = i * 0.8;
          return (
            <div
              key={flower.id}
              className="bouquet-display__flower-wrap"
              style={{
                width: `${flowerSize}px`,
                height: `${flowerSize}px`,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
                zIndex: 2 + i,
              }}
            >
              <img
                src={flower.image}
                alt={flower.name}
                className="bouquet-display__flower"
                draggable={false}
                style={{
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                }}
              />
            </div>
          );
        })}

        {/* Layer 3: Bush top overlay (only if this bush type has one) */}
        {bushType.bushTop && (
          <img
            src={bushType.bushTop}
            alt=""
            className="bouquet-display__bush bouquet-display__bush--top"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}
