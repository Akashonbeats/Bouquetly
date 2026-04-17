import { useParams, Link } from 'react-router-dom';
import { decodeBouquet } from '../../utils/bouquetEncoder';
import { getFlowerById } from '../../utils/flowers';
import BouquetDisplay from '../../components/BouquetDisplay/BouquetDisplay';
import NoteCardPreview from '../../components/NoteCardPreview/NoteCardPreview';
import './GiftPage.css';
import { useState } from 'react';

/* Curvy ornament SVG — old-book style flourish */
const Flourish = ({ className = '' }) => (
  <svg className={`flourish ${className}`} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* Corner ornament — decorative curl */
const CornerOrnament = ({ className = '' }) => (
  <svg className={`corner-ornament ${className}`} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 55 Q5 30 15 20 Q25 10 40 8 Q50 7 55 5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M10 55 Q10 35 18 25 Q26 15 38 13"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

export default function GiftPage() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const data = decodeBouquet(id);

  if (!data) {
    return (
      <div className="gift-page gift-page--error">
        <h1 className="display-sm">couldn't find this bouquet</h1>
        <Link to="/" className="btn btn-primary">go home</Link>
      </div>
    );
  }

  const { selectedFlowers, bouquetType, note } = data;

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
      {/* Corner ornaments */}
      <CornerOrnament className="corner-ornament--tl" />
      <CornerOrnament className="corner-ornament--tr" />
      <CornerOrnament className="corner-ornament--bl" />
      <CornerOrnament className="corner-ornament--br" />

      {/* Header */}
      <header className="gift-page__header">
        <Link to="/" className="gift-page__logo">Bouquetly</Link>
        <button className="btn btn-outline" onClick={handleCopy} id="share-btn">
          {copied ? '✓ copied' : 'share'}
        </button>
      </header>

      {/* Dedication with flourishes */}
      <div className="gift-page__dedication animate-fade-in-up">
        <Flourish />
        <h1 className="display-sm">
          for {note.to || 'you'}
        </h1>
        <Flourish />
      </div>

      {/* Side-by-side gifts */}
      <div className="gift-page__gifts animate-scale-in">
        <div className="gift-page__bouquet">
          <BouquetDisplay
            selectedFlowers={selectedFlowers}
            bouquetType={bouquetType}
            size="large"
          />
        </div>
        <div className="gift-page__card">
          <NoteCardPreview note={note} />
        </div>
      </div>

      {/* Footer */}
      <footer className="gift-page__footer">
        <Flourish className="flourish--small" />
        <span className="body-sm" style={{ color: 'var(--outline)', opacity: 0.6 }}>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Bouquetly</Link>
        </span>
      </footer>
    </div>
  );
}
