import { useEffect, useRef, useState } from 'react';
import { useBouquet } from '../../context/BouquetContext';
import { FLOWERS } from '../../utils/flowers';
import { Plus } from 'lucide-react';
import './SelectedFlowersPill.css';

export default function SelectedFlowersPill({ vibrate }) {
  const { selectedFlowers } = useBouquet();
  const [isMarquee, setIsMarquee] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const flowerCount = selectedFlowers.length;
  const isGlowing = flowerCount >= 5;
  const isMax = flowerCount >= 10;

  // Resolve flower objects to get images
  const items = selectedFlowers.map((id, index) => {
    const f = FLOWERS.find((fl) => fl.id === id);
    return { ...f, key: `${id}-${index}` };
  });

  // Calculate empty slots to always show at least 5 circles initially
  const emptySlotsCount = Math.max(0, 5 - flowerCount);
  const emptySlots = Array.from({ length: emptySlotsCount }).map((_, i) => i + flowerCount + 1);

  // Check if we need to marquee
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    const checkOverflow = () => {
      const isOverflowing = contentRef.current.scrollWidth > containerRef.current.clientWidth;
      setIsMarquee(isOverflowing);
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [flowerCount]);

  const renderContent = (isFirst = false) => (
    <div className="pill__content" ref={isFirst ? contentRef : null}>
      {/* Selected Flowers */}
      {items.map((flower) => (
        <div key={flower.key} className="pill__circle pill__circle--filled">
          <img src={flower.image} alt={flower.name} draggable={false} />
        </div>
      ))}
      
      {/* Empty Slots (Only visible when < 5) */}
      {emptySlots.map((num) => (
        <div key={`empty-${num}`} className="pill__circle pill__circle--empty">
          <span>{num}</span>
        </div>
      ))}

      {/* Plus Button Slot (Visible when >= 5 and < 10) */}
      {isGlowing && !isMax && (
        <div className="pill__circle pill__circle--plus">
          <Plus size={14} strokeWidth={3} />
        </div>
      )}
    </div>
  );

  return (
    <div className="selected-flowers-pill-wrapper">
      <div className={`pill__header ${vibrate ? 'pill__header--error' : ''}`}>
        <span className="pill__count-text">
          <strong>{flowerCount}</strong> / 10 · min 5
        </span>
      </div>
      
      <div 
        className={`selected-flowers-pill ${isGlowing ? 'selected-flowers-pill--glow' : ''} ${vibrate ? 'selected-flowers-pill--error' : ''}`}
        ref={containerRef}
      >
        <div className={`pill__scroller ${isMarquee ? 'pill__scroller--marquee' : ''}`}>
          {renderContent(true)}
          {/* Duplicate content for seamless marquee loop if overflowing */}
          {isMarquee && renderContent(false)}
        </div>
      </div>
    </div>
  );
}


