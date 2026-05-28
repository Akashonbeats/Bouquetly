import { useState, useEffect, useRef } from 'react';
import { useTransitionNavigate } from '../../hooks/useTransitionNavigate';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';
import { FLOWERS } from '../../utils/flowers';
import FlowerCard from '../../components/FlowerCard/FlowerCard';
import SelectedFlowersPill from '../../components/SelectedFlowersPill/SelectedFlowersPill';
import MilestoneOverlay from '../../components/MilestoneOverlay/MilestoneOverlay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../BuilderPage.css';

const MIN_FLOWERS = 5;
const MAX_FLOWERS = 10;

export default function SelectFlowersPage() {
  const { selectedFlowers } = useBouquet();
  const dispatch = useBouquetDispatch();
  const navigate = useTransitionNavigate();

  const [showMilestone, setShowMilestone] = useState(false);
  // If user navigates back to this page and already has >= 5 flowers, 
  // assume they've already seen the milestone so we don't accidentally block clicks.
  const milestoneSeenRef = useRef(selectedFlowers.length >= MIN_FLOWERS);
  const [vibrate, setVibrate] = useState(false);

  const canProceed = selectedFlowers.length >= MIN_FLOWERS;
  const atMax = selectedFlowers.length >= MAX_FLOWERS;

  // Trigger flashy overlay once when exactly 5 flowers are reached
  useEffect(() => {
    if (selectedFlowers.length === MIN_FLOWERS && !milestoneSeenRef.current) {
      setShowMilestone(true);
      milestoneSeenRef.current = true;
      const t = setTimeout(() => setShowMilestone(false), 1500);
      return () => clearTimeout(t);
    }
  }, [selectedFlowers.length]);

  const handleAdd = (id) => {
    if (atMax) {
      setVibrate(true);
      setTimeout(() => setVibrate(false), 300);
      return;
    }

    // Block rapid clicks if the 5th flower was just selected and the splash is about to trigger
    if (selectedFlowers.length >= MIN_FLOWERS && !milestoneSeenRef.current) {
      return;
    }

    // Block any clicks while the splash screen is actively displaying
    if (showMilestone) {
      return;
    }

    dispatch({ type: 'ADD_FLOWER', payload: id });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FLOWER', payload: id });
  };

  // Helper to count occurrences of a specific flower
  const getFlowerCount = (id) => {
    return selectedFlowers.filter(f => f === id).length;
  };

  return (
    <div className="builder-page">
      <MilestoneOverlay isVisible={showMilestone} />
      
      <div className="builder-page__body">
        <div className="builder-page__title-row">
          <h1 className="display-sm">pick your blooms</h1>
        </div>

        <div className="flower-grid stagger">
          {FLOWERS.map(flower => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              count={getFlowerCount(flower.id)}
              onAdd={handleAdd}
              onRemove={handleRemove}
              disabled={atMax}
            />
          ))}
        </div>
      </div>

      <div className="builder-page__nav container">
        <button className="btn btn-text" onClick={() => navigate('/')}>
          <ArrowLeft size={16} strokeWidth={2} /> back
        </button>
        
        <SelectedFlowersPill vibrate={vibrate} />

        <button
          className="btn btn-primary"
          disabled={!canProceed}
          onClick={() => navigate('/build/bouquet')}
          id="next-to-bouquet"
        >
          next <ArrowRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
