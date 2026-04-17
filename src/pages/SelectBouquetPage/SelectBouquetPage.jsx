import { useNavigate } from 'react-router-dom';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';
import { BOUQUET_TYPES } from '../../utils/flowers';
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
        <h1 className="display-sm">choose your greenery</h1>
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
                  select a style
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="builder-page__nav container">
        <button className="btn btn-text" onClick={() => navigate('/build/flowers')}>← back</button>
        <button
          className="btn btn-primary"
          disabled={!bouquetType}
          onClick={() => navigate('/build/note')}
          id="next-to-note"
        >
          next →
        </button>
      </div>
    </div>
  );
}
