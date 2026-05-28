import { useEffect, useState } from 'react';
import { useBouquet } from '../../context/BouquetContext';
import { FLOWERS } from '../../utils/flowers';
import './MilestoneOverlay.css';

export default function MilestoneOverlay({ isVisible }) {
  const { selectedFlowers } = useBouquet();
  const [renderState, setRenderState] = useState('idle');

  // We need to keep it mounted for exit animation
  useEffect(() => {
    let t1, t2;
    if (isVisible) {
      setRenderState('entering');
      t1 = setTimeout(() => setRenderState('visible'), 50);
    } else {
      setRenderState('exiting');
      t2 = setTimeout(() => setRenderState('idle'), 600);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible]);

  if (renderState === 'idle') return null;

  // Get the first 5 unique objects (or just map the first 5 IDs to their flower data)
  const milestoneFlowers = selectedFlowers.slice(0, 5).map((id, index) => {
    const f = FLOWERS.find((fl) => fl.id === id);
    return { ...f, key: `milestone-${id}-${index}` };
  });

  return (
    <div className={`milestone-overlay milestone-overlay--${renderState}`}>
      <div className="milestone-overlay__backdrop"></div>
      
      <div className="milestone-overlay__content">
        <div className="milestone-overlay__text">
          <h2 className="display-sm">5 Flowers Selected</h2>
          <p className="body-md">You can add 5 more flowers if you wish</p>
        </div>

        {milestoneFlowers.map((flower, i) => (
          <img 
            key={flower.key}
            src={flower.image} 
            alt={flower.name}
            className={`milestone-overlay__flower milestone-overlay__flower--${i + 1}`}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
