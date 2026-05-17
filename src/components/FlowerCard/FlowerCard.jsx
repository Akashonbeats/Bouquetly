import { CircleCheck } from 'lucide-react';
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
          <CircleCheck size={20} strokeWidth={2} fill="var(--primary)" color="white" />
        </div>
      )}
    </button>
  );
}
