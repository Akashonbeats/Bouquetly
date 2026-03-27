import { useParams, Link } from 'react-router-dom';
import { decodeBouquet } from '../../utils/bouquetEncoder';
import { getFlowerById } from '../../utils/flowers';
import BouquetDisplay from '../../components/BouquetDisplay/BouquetDisplay';
import NoteCardPreview from '../../components/NoteCardPreview/NoteCardPreview';
import './GiftPage.css';
import { useState } from 'react';

export default function GiftPage() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const data = decodeBouquet(id);

  if (!data) {
    return (
      <div className="gift-page gift-page--error container">
        <h1 className="display-sm">This bouquet couldn't be found</h1>
        <p className="body-md">The link may be invalid or expired.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  const { selectedFlowers, bouquetType, note } = data;
  const flowers = selectedFlowers.map(id => getFlowerById(id)).filter(Boolean);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="gift-page">
      {/* Floating petals */}
      <div className="gift-page__petals">
        {flowers.slice(0, 4).map((flower, i) => (
          <div key={flower.id} className={`gift-page__floating-petal gift-page__floating-petal--${i + 1}`}>
            <img src={flower.image} alt={flower.name} style={{ width: 40, height: 40, objectFit: 'contain' }} draggable={false} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="gift-page__header">
        <Link to="/" className="gift-page__logo">Bouquetly</Link>
        <button className="btn btn-outline" onClick={handleCopy} id="share-btn">
          {copied ? '✓ Copied!' : 'Share Link'}
        </button>
      </header>

      {/* Content */}
      <div className="gift-page__content container">
        <div className="gift-page__hero animate-fade-in-up">
          <span className="label-sm" style={{ color: 'var(--outline)' }}>Your Digital Gift</span>
          <h1 className="display-sm gift-page__dedication">
            For my dearest {note.to || 'you'},<br />
            <em>a garden that never fades.</em>
          </h1>
        </div>

        <div className="gift-page__bouquet animate-scale-in">
          <BouquetDisplay
            selectedFlowers={selectedFlowers}
            bouquetType={bouquetType}
            size="large"
          />
        </div>

        {/* Flower meanings */}
        <div className="gift-page__meanings stagger">
          {flowers.map(flower => (
            <div key={flower.id} className="gift-page__meaning">
              <img src={flower.image} alt={flower.name} style={{ width: 36, height: 36, objectFit: 'contain' }} draggable={false} />
              <div>
                <span className="label-md">{flower.name}</span>
                <span className="body-sm" style={{ color: 'var(--outline)' }}>{flower.meaning}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note Card */}
        <div className="gift-page__note animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <NoteCardPreview note={note} />
        </div>
      </div>

      {/* Footer */}
      <footer className="gift-page__footer">
        <span className="body-sm" style={{ color: 'var(--outline)' }}>
          Made with <Link to="/" style={{ color: 'var(--primary)' }}>Bouquetly</Link> Curated Atelier &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
