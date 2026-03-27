import './BouquetTypeCard.css';

export default function BouquetTypeCard({ type, selected, onSelect }) {
  return (
    <button
      className={`bouquet-type-card ${selected ? 'bouquet-type-card--selected' : ''}`}
      onClick={() => onSelect(type.id)}
      aria-pressed={selected}
      id={`bouquet-type-${type.id}`}
    >
      <span className="bouquet-type-card__icon">{type.icon}</span>
      <div className="bouquet-type-card__info">
        <h3 className="bouquet-type-card__name">{type.name}</h3>
        <p className="bouquet-type-card__desc body-sm">{type.description}</p>
      </div>
      {selected && (
        <div className="bouquet-type-card__check">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="var(--secondary)" />
            <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
}
