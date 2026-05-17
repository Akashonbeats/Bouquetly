import { useTransitionNavigate } from '../../hooks/useTransitionNavigate';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';
import { FLOWERS } from '../../utils/flowers';
import FlowerCard from '../../components/FlowerCard/FlowerCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../BuilderPage.css';

const MIN_FLOWERS = 4;
const MAX_FLOWERS = 7;

export default function SelectFlowersPage() {
  const { selectedFlowers } = useBouquet();
  const dispatch = useBouquetDispatch();
  const navigate = useTransitionNavigate();

  const canProceed = selectedFlowers.length >= MIN_FLOWERS;
  const atMax = selectedFlowers.length >= MAX_FLOWERS;

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_FLOWER', payload: id });
  };

  return (
    <div className="builder-page">
      <div className="builder-page__body">
        <div className="builder-page__title-row">
          <h1 className="display-sm">pick your blooms</h1>
          <span className="body-sm builder-page__counter">
            <strong>{selectedFlowers.length}</strong> / {MAX_FLOWERS}
            {selectedFlowers.length < MIN_FLOWERS && (
              <span className="builder-page__hint"> · min {MIN_FLOWERS}</span>
            )}
          </span>
        </div>

        <div className="flower-grid stagger">
          {FLOWERS.map(flower => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              selected={selectedFlowers.includes(flower.id)}
              onToggle={handleToggle}
              disabled={atMax && !selectedFlowers.includes(flower.id)}
            />
          ))}
        </div>
      </div>

      <div className="builder-page__nav container">
        <button className="btn btn-text" onClick={() => navigate('/')}>
          <ArrowLeft size={16} strokeWidth={2} /> back
        </button>
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
