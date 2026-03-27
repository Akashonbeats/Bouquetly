import { useNavigate } from 'react-router-dom';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';
import { BOUQUET_TYPES } from '../../utils/flowers';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import BouquetTypeCard from '../../components/BouquetTypeCard/BouquetTypeCard';
import BouquetDisplay from '../../components/BouquetDisplay/BouquetDisplay';
import '../BuilderPage.css';

export default function SelectBouquetPage() {
  const { bouquetType, selectedFlowers } = useBouquet();
  const dispatch = useBouquetDispatch();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    dispatch({ type: 'SET_BOUQUET_TYPE', payload: id });
  };

  return (
    <div className="builder-page">
      <div className="builder-page__header container">
        <StepIndicator current={2} />
        <h1 className="display-sm">Choose your bouquet style.</h1>
      </div>

      <div className="builder-page__content container">
        <div className="builder-page__split">
          <div className="builder-page__options stagger">
            {BOUQUET_TYPES.map(type => (
              <BouquetTypeCard
                key={type.id}
                type={type}
                selected={bouquetType === type.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <div className="builder-page__preview animate-fade-in">
            {bouquetType && selectedFlowers.length > 0 ? (
              <BouquetDisplay
                selectedFlowers={selectedFlowers}
                bouquetType={bouquetType}
                size="small"
              />
            ) : (
              <div className="builder-page__preview-placeholder">
                <span className="body-sm" style={{ color: 'var(--outline)' }}>
                  Select a style to preview
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="builder-page__nav container">
        <button className="btn btn-text" onClick={() => navigate('/build/flowers')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button
          className="btn btn-primary"
          disabled={!bouquetType}
          onClick={() => navigate('/build/note')}
          id="next-to-note"
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
