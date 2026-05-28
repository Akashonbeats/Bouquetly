import { Minus } from 'lucide-react';
import './FlowerCard.css';

export default function FlowerCard({ flower, count, onAdd, onRemove, disabled }) {
  const handleAdd = (e) => {
    // If we click the card but not a specific inner button
    e.preventDefault();
    if (!disabled) onAdd(flower.id);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (count > 0) onRemove(flower.id);
  };

  return (
    <button
      className={`flower-card ${count > 0 ? 'flower-card--selected' : ''} ${disabled ? 'flower-card--disabled' : ''}`}
      onClick={handleAdd}
      disabled={disabled && count === 0}
      aria-pressed={count > 0}
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
      
      {count > 0 && (
        <div className="flower-card__badge-container">
          <button 
            className="flower-card__remove-btn" 
            onClick={handleRemove}
            aria-label={`Remove one ${flower.name}`}
          >
            <Minus size={14} strokeWidth={3} />
          </button>
          <div className="flower-card__badge">
            x{count}
          </div>
        </div>
      )}
    </button>
  );
}
