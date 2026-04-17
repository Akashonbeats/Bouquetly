import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <section className="landing">
      <div className="landing__center">
        <h1 className="display-lg landing__title animate-fade-in-up">
          Bouquetly
        </h1>
        <p className="body-md landing__subtitle animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          craft a digital bouquet for someone you adore
        </p>
        <Link
          to="/build/flowers"
          className="btn btn-primary landing__cta animate-fade-in-up"
          id="start-building"
          style={{ animationDelay: '0.3s' }}
        >
          begin →
        </Link>
      </div>
    </section>
  );
}
