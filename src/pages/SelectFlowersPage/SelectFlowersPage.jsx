import { useNavigate } from 'react-router-dom';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';
import { FLOWERS } from '../../utils/flowers';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import FlowerCard from '../../components/FlowerCard/FlowerCard';
import '../BuilderPage.css';

const MIN_FLOWERS = 4;
const MAX_FLOWERS = 7;

export default function SelectFlowersPage() {
  const { selectedFlowers } = useBouquet();
  const dispatch = useBouquetDispatch();
  const navigate = useNavigate();

  const canProceed = selectedFlowers.length >= MIN_FLOWERS;
  const atMax = selectedFlowers.length >= MAX_FLOWERS;

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_FLOWER', payload: id });
  };

  return (
    <div className="builder-page">
      <div className="builder-page__header container">
        <StepIndicator current={1} />
        <div className="builder-page__title-row">
          <h1 className="display-sm">Pick your flowers.</h1>
          <span className="body-sm builder-page__counter">
            <strong>{selectedFlowers.length}</strong> / {MAX_FLOWERS} selected
            {selectedFlowers.length < MIN_FLOWERS && (
              <span className="builder-page__hint"> · Pick at least {MIN_FLOWERS}</span>
            )}
          </span>
        </div>
      </div>

      <div className="builder-page__content container">
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button
          className="btn btn-primary"
          disabled={!canProceed}
          onClick={() => navigate('/build/bouquet')}
          id="next-to-bouquet"
        >
          Next
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
