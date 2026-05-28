import { useState, useEffect } from 'react';
import './BouquetDisplay.css';
import { BOUQUET_TYPES, getFlowerById } from '../../utils/flowers';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';

// Fully organic, asymmetrical, hand-tied layout.
// Deliberately imperfect to avoid symmetrical mechanical patterns,
// while guaranteeing uniform, comfortable gaps between adjacent flowers.
const POSITION_MAP = {
  4: [
    { x: 48, y: 49, scale: 1.1, rotate: 5 },
    { x: 64, y: 45, scale: 0.95, rotate: -12 },
    { x: 52, y: 31, scale: 1.0, rotate: 8 },
    { x: 33, y: 39, scale: 1.05, rotate: -6 },
  ],
  5: [
    { x: 52, y: 46, scale: 1.1, rotate: 5 },
    { x: 68, y: 42, scale: 0.95, rotate: -12 },
    { x: 56, y: 28, scale: 1.0, rotate: 8 },
    { x: 37, y: 36, scale: 1.05, rotate: -6 },
    { x: 38, y: 54, scale: 0.9, rotate: 15 },
  ],
  6: [
    { x: 51, y: 44, scale: 1.1, rotate: 5 },
    { x: 67, y: 40, scale: 0.95, rotate: -12 },
    { x: 55, y: 26, scale: 1.0, rotate: 8 },
    { x: 36, y: 34, scale: 1.05, rotate: -6 },
    { x: 37, y: 52, scale: 0.9, rotate: 15 },
    { x: 53, y: 60, scale: 1.0, rotate: -10 },
  ],
  7: [
    { x: 48, y: 44, scale: 1.1, rotate: 5 },
    { x: 64, y: 40, scale: 0.95, rotate: -12 },
    { x: 52, y: 26, scale: 1.0, rotate: 8 },
    { x: 33, y: 34, scale: 1.05, rotate: -6 },
    { x: 34, y: 52, scale: 0.9, rotate: 15 },
    { x: 50, y: 60, scale: 1.0, rotate: -10 },
    { x: 68, y: 56, scale: 0.95, rotate: 18 },
  ],
  8: [
    { x: 45, y: 44, scale: 1.1, rotate: 5 },
    { x: 57, y: 42, scale: 0.95, rotate: -12 },
    { x: 49, y: 26, scale: 1.0, rotate: 8 },
    { x: 30, y: 34, scale: 1.05, rotate: -6 },
    { x: 31, y: 52, scale: 0.9, rotate: 15 },
    { x: 47, y: 60, scale: 1.0, rotate: -10 },
    { x: 65, y: 56, scale: 0.95, rotate: 18 },
    { x: 73, y: 44, scale: 1.05, rotate: -5 },
  ],
  9: [
    { x: 46, y: 46, scale: 1.1, rotate: 5 },
    { x: 58, y: 44, scale: 0.95, rotate: -12 },
    { x: 50, y: 28, scale: 1.0, rotate: 8 },
    { x: 31, y: 36, scale: 1.05, rotate: -6 },
    { x: 32, y: 54, scale: 0.9, rotate: 15 },
    { x: 48, y: 62, scale: 1.0, rotate: -10 },
    { x: 66, y: 58, scale: 0.95, rotate: 18 },
    { x: 74, y: 46, scale: 1.05, rotate: -5 },
    { x: 20, y: 46, scale: 0.9, rotate: 12 },
  ],
  10: [
    { x: 48, y: 44, scale: 1.1, rotate: 5 },
    { x: 60, y: 42, scale: 0.95, rotate: -12 },
    { x: 52, y: 26, scale: 1.0, rotate: 8 },
    { x: 33, y: 34, scale: 1.05, rotate: -6 },
    { x: 34, y: 52, scale: 0.9, rotate: 15 },
    { x: 50, y: 60, scale: 1.0, rotate: -10 },
    { x: 68, y: 56, scale: 0.95, rotate: 18 },
    { x: 76, y: 44, scale: 1.05, rotate: -5 },
    { x: 20, y: 46, scale: 0.9, rotate: 12 },
    { x: 68, y: 30, scale: 1.0, rotate: -14 }, // Moved from bottom left (28, 66) to top right to balance weight
  ],
};

export default function BouquetDisplay({ selectedFlowers, bouquetType, size = 'large', shuffleOrder: propShuffleOrder }) {
  // We need stable unique IDs based on the original selection index so React can animate them correctly
  const flowers = selectedFlowers.map((id, index) => {
    const data = getFlowerById(id);
    return data ? { ...data, uniqueId: `${id}-${index}` } : null;
  }).filter(Boolean);
  
  const bushType = BOUQUET_TYPES.find(t => t.id === bouquetType) || BOUQUET_TYPES[0];
  // If a shuffleOrder prop is explicitly passed (e.g., from GiftPage), use it.
  // Otherwise, use the globally managed shuffleOrder from context.
  const context = useBouquet();
  const dispatch = useBouquetDispatch();
  const currentShuffleOrder = propShuffleOrder || (context ? context.shuffleOrder : []);

  const count = Math.min(flowers.length, 10);
  const positions = POSITION_MAP[count] || POSITION_MAP[4];
  
  // Ensure we have a valid array of the right length
  const validOrder = currentShuffleOrder && currentShuffleOrder.length === count 
    ? currentShuffleOrder 
    : Array.from({ length: count }, (_, i) => i);

  const handleRearrange = () => {
    // Only allow rearranging if we have dispatch (meaning we are in the builder, not GiftPage)
    if (!dispatch) return;

    const newOrder = [...validOrder];
    if (newOrder.length <= 1) return;
    
    // Shuffle the ENTIRE array
    for (let i = newOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    }
    
    dispatch({ type: 'SET_SHUFFLE_ORDER', payload: newOrder });
  };

  let baseSize = size === 'large' ? 90 : 65;
  if (count > 7) {
    baseSize = baseSize * 0.85; // slightly smaller to prevent crowding
  }
  const flowerSize = baseSize;

  return (
    <div className={`bouquet-display bouquet-display--${size}`}>
      <div className="bouquet-display__canvas" onClick={handleRearrange}>
        {/* Layer 1: Bush background */}
        <img
          src={bushType.bush}
          alt=""
          className="bouquet-display__bush bouquet-display__bush--back"
          draggable={false}
        />

        {/* Layer 2: Flower images */}
        {flowers.map((flower, i) => {
          const targetIndex = validOrder[i] !== undefined ? validOrder[i] : i;
          const pos = positions[targetIndex] || { x: 50, y: 40, scale: 1, rotate: 0 };
          const duration = 6 + (i % 4) * 0.9;
          const delay = i * 0.8;
          
          // Apply a vertical offset for the taller bush types to ground the bouquet
          let yOffset = 0;
          if (bouquetType === 'meadow') {
            yOffset = 18; // Wild Meadow needs a deeper grounding
          } else if (bouquetType === 'botanical') {
            yOffset = 10;
          }

          return (
            <div
              key={flower.uniqueId}
              className="bouquet-display__flower-wrap"
              style={{
                width: `${flowerSize}px`,
                height: `${flowerSize}px`,
                left: `${pos.x}%`,
                top: `${pos.y + yOffset}%`,
                transform: `translate(-50%, -50%) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
                zIndex: 2 + targetIndex,
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

      </div>
    </div>
  );
}
