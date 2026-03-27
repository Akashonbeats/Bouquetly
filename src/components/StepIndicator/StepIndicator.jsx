import './StepIndicator.css';

export default function StepIndicator({ current, total = 3 }) {
  return (
    <div className="step-indicator">
      <span className="step-indicator__label label-sm">
        Step {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div className="step-indicator__track">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`step-indicator__dot ${
              i < current ? 'step-indicator__dot--active' : ''
            } ${i === current - 1 ? 'step-indicator__dot--current' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
