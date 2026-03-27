import { getFlowerById, BOUQUET_TYPES } from '../../utils/flowers';
import './BouquetDisplay.css';

/**
 * BouquetDisplay — Image-based flowers layered on bush greenery.
 *
 * Z-index layering:
 *   1. Bush background image
 *   2. Flower images (positioned in center of bush)
 *   3. Bush top overlay (if the bush type has one)
 */
export default function BouquetDisplay({ selectedFlowers, bouquetType, size = 'large' }) {
  const flowers = selectedFlowers.map(id => getFlowerById(id)).filter(Boolean);
  const count = flowers.length;
  const isLarge = size === 'large';

  // Find the selected bush type — default to first
  const bushType = BOUQUET_TYPES.find(b => b.id === bouquetType) || BOUQUET_TYPES[0];

  // Adaptive flower size: bigger when fewer, smaller when many
  const flowerSize = isLarge
    ? (count <= 4 ? 120 : count <= 6 ? 100 : 85)
    : (count <= 4 ? 85 : count <= 6 ? 70 : 60);

  // Flowers centered vertically & horizontally within the bush
  // Y positions centered around 50% (the vertical center of the canvas)
  const getPositions = () => {
    if (count === 1) {
      return [{ x: 50, y: 42, scale: 1.15, rotate: 0 }];
    }
    if (count === 2) {
      return [
        { x: 40, y: 38, scale: 1.05, rotate: -8 },
        { x: 60, y: 42, scale: 1.05, rotate: 6 },
      ];
    }
    if (count === 3) {
      return [
        { x: 38, y: 34, scale: 1, rotate: -6 },
        { x: 62, y: 34, scale: 1, rotate: 8 },
        { x: 50, y: 48, scale: 1, rotate: -3 },
      ];
    }
    if (count === 4) {
      return [
        { x: 38, y: 30, scale: 1, rotate: -8 },
        { x: 62, y: 30, scale: 1, rotate: 6 },
        { x: 36, y: 48, scale: 1, rotate: 4 },
        { x: 60, y: 50, scale: 1, rotate: -5 },
      ];
    }
    if (count === 5) {
      return [
        { x: 38, y: 26, scale: 0.95, rotate: -6 },
        { x: 62, y: 26, scale: 0.95, rotate: 8 },
        { x: 30, y: 42, scale: 0.95, rotate: 5 },
        { x: 50, y: 44, scale: 0.95, rotate: -4 },
        { x: 70, y: 42, scale: 0.95, rotate: 7 },
      ];
    }
    if (count === 6) {
      return [
        { x: 38, y: 24, scale: 0.9, rotate: -5 },
        { x: 62, y: 24, scale: 0.9, rotate: 7 },
        { x: 28, y: 40, scale: 0.9, rotate: 4 },
        { x: 50, y: 38, scale: 0.9, rotate: -6 },
        { x: 72, y: 40, scale: 0.9, rotate: 5 },
        { x: 50, y: 54, scale: 0.9, rotate: -3 },
      ];
    }
    // 7+
    return [
      { x: 38, y: 22, scale: 0.85, rotate: -6 },
      { x: 62, y: 22, scale: 0.85, rotate: 7 },
      { x: 26, y: 38, scale: 0.85, rotate: 4 },
      { x: 50, y: 36, scale: 0.85, rotate: -5 },
      { x: 74, y: 38, scale: 0.85, rotate: 6 },
      { x: 36, y: 54, scale: 0.85, rotate: -3 },
      { x: 62, y: 54, scale: 0.85, rotate: 5 },
    ].slice(0, count);
  };

  const positions = getPositions();

  return (
    <div className={`bouquet-display bouquet-display--${size}`}>
      <div className="bouquet-display__canvas">
        {/* Layer 1: Bush background greenery */}
        <img
          src={bushType.bush}
          alt=""
          className="bouquet-display__bush bouquet-display__bush--back"
          draggable={false}
        />

        {/* Layer 2: Flower images — centered within the bush */}
        {flowers.map((flower, i) => {
          const pos = positions[i] || { x: 50, y: 40, scale: 1, rotate: 0 };
          const duration = 6 + (i % 4) * 0.9; // 6s, 6.9s, 7.8s, 8.7s — varied
          const delay = i * 0.8; // staggered start
          return (
            <img
              key={flower.id}
              src={flower.image}
              alt={flower.name}
              className="bouquet-display__flower"
              draggable={false}
              style={{
                width: `${flowerSize}px`,
                height: `${flowerSize}px`,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
                zIndex: 2 + i,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              }}
            />
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
