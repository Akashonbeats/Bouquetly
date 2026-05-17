import { useTransitionNavigate } from '../../hooks/useTransitionNavigate';
import { markFlowStarted } from '../../components/FlowGuard/FlowGuard';
import { ArrowRight } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useTransitionNavigate();

  const handleBegin = () => {
    markFlowStarted();
    navigate('/build/flowers');
  };

  return (
    <section className="landing">
      <div className="landing__center">
        <h1 className="display-lg landing__title animate-fade-in-up">
          Bouquetly
        </h1>
        <p className="body-md landing__subtitle animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          craft a digital bouquet for someone you adore
        </p>
        <button
          className="btn btn-primary landing__cta animate-fade-in-up"
          id="start-building"
          style={{ animationDelay: '0.3s' }}
          onClick={handleBegin}
        >
          begin <ArrowRight size={16} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
