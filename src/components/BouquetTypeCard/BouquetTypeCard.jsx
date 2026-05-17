import { CircleCheck } from 'lucide-react';
import './BouquetTypeCard.css';

export default function BouquetTypeCard({ type, selected, onSelect }) {
  return (
    <button
      className={`bouquet-type-card ${selected ? 'bouquet-type-card--selected' : ''}`}
      onClick={() => onSelect(type.id)}
      aria-pressed={selected}
      id={`bouquet-type-${type.id}`}
    >
      <div className="bouquet-type-card__thumb">
        <img src={type.bush} alt={type.name} className="bouquet-type-card__img" draggable={false} />
      </div>
      <div className="bouquet-type-card__info">
        <h3 className="bouquet-type-card__name">{type.name}</h3>
        <p className="bouquet-type-card__desc body-sm">{type.description}</p>
      </div>
      {selected && (
        <div className="bouquet-type-card__check">
          <CircleCheck size={18} strokeWidth={2} fill="var(--secondary)" color="white" />
        </div>
      )}
    </button>
  );
}
