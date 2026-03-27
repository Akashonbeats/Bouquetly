import { Link } from 'react-router-dom';
import { FLOWERS } from '../../utils/flowers';
import './LandingPage.css';

export default function LandingPage() {
  // Pick a few flowers for decorative use
  const heroFlowers = FLOWERS.slice(0, 5);
  const featureFlowers = [
    FLOWERS.find(f => f.id === 'anemone'),
    FLOWERS.find(f => f.id === 'sunflower'),
    FLOWERS.find(f => f.id === 'carnation'),
  ];

  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__hero-bg">
          {heroFlowers.map((f, i) => (
            <div key={f.id} className={`landing__petal landing__petal--${i + 1}`}>
              <img src={f.image} alt={f.name} style={{ width: i === 0 ? 60 : 45 + i * 3, height: 'auto' }} draggable={false} />
            </div>
          ))}
        </div>

        <div className="landing__hero-content container animate-fade-in-up">
          <span className="label-sm landing__edition">Edition No. 001 / Summer Blooms</span>
          <h1 className="display-lg landing__title">
            For your<br />
            <em>Everlasting</em> Love
          </h1>
          <p className="body-md landing__subtitle">
            Crafting bespoke digital arrangements using hand-textured strokes and the precision of the grid.
          </p>
          <div className="landing__cta-group">
            <Link to="/build/flowers" className="btn btn-primary" id="start-building">
              Start Building
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing__features container">
        <div className="landing__features-grid stagger">
          <div className="landing__feature">
            <div className="landing__feature-icon">
              <img src={featureFlowers[0]?.image} alt="Texture" style={{ width: 64, height: 64, objectFit: 'contain' }} />
            </div>
            <h3 className="headline-md">Texture</h3>
            <p className="body-sm">
              Every petal is digitally painted with a custom oil-pastel brush engine to preserve human imperfection.
            </p>
          </div>
          <div className="landing__feature">
            <div className="landing__feature-icon">
              <img src={featureFlowers[1]?.image} alt="Curation" style={{ width: 64, height: 64, objectFit: 'contain' }} />
            </div>
            <h3 className="headline-md">Curation</h3>
            <p className="body-sm">
              Select from seasonal palettes inspired by vintage botanical journals and avant-garde editorial design.
            </p>
          </div>
          <div className="landing__feature">
            <div className="landing__feature-icon">
              <img src={featureFlowers[2]?.image} alt="Ownership" style={{ width: 64, height: 64, objectFit: 'contain' }} />
            </div>
            <h3 className="headline-md">Ownership</h3>
            <p className="body-sm">
              Your unique bouquet remains yours — a high-fidelity digital heirloom for your curated screens.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing__how container">
        <span className="label-sm" style={{ color: 'var(--outline)' }}>How It Works</span>
        <h2 className="display-sm">Three simple steps to craft your digital bouquet</h2>
        <div className="landing__steps stagger">
          <div className="landing__step">
            <span className="landing__step-num">01</span>
            <h4 className="headline-md">Pick Your Blooms</h4>
            <p className="body-sm">Choose 4 to 7 flowers from our curated collection. Each bloom carries a unique meaning.</p>
          </div>
          <div className="landing__step">
            <span className="landing__step-num">02</span>
            <h4 className="headline-md">Choose Your Style</h4>
            <p className="body-sm">Select a greenery style — Wild Meadow, Emerald Garden, or Eucalyptus Dream.</p>
          </div>
          <div className="landing__step">
            <span className="landing__step-num">03</span>
            <h4 className="headline-md">Write a Note</h4>
            <p className="body-sm">Add a personalized letter card and share your creation via a unique link.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
