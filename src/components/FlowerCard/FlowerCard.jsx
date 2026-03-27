import './FlowerCard.css';

export default function FlowerCard({ flower, selected, onToggle, disabled }) {
  return (
    <button
      className={`flower-card ${selected ? 'flower-card--selected' : ''} ${disabled ? 'flower-card--disabled' : ''}`}
      onClick={() => onToggle(flower.id)}
      disabled={disabled && !selected}
      aria-pressed={selected}
      id={`flower-${flower.id}`}
    >
      <div className="flower-card__illustration">
        <img
          src={flower.image}
          alt={flower.name}
          className="flower-card__img"
          draggable={false}
        />
      </div>
      <div className="flower-card__info">
        <h3 className="flower-card__name">{flower.name}</h3>
        <span className="flower-card__meaning label-sm">{flower.meaning}</span>
      </div>
      {selected && (
        <div className="flower-card__check">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="var(--primary)" />
            <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
}
