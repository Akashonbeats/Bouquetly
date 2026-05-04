import { useParams } from 'react-router-dom';
import { useTransitionNavigate } from '../../hooks/useTransitionNavigate';
import { decodeBouquet } from '../../utils/bouquetEncoder';
import BouquetDisplay from '../../components/BouquetDisplay/BouquetDisplay';
import NoteCardPreview from '../../components/NoteCardPreview/NoteCardPreview';
import './GiftPage.css';
import { useState } from 'react';

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

export default function GiftPage() {
  const { id } = useParams();
  const navigate = useTransitionNavigate();
  const [copied, setCopied] = useState(false);
  const data = decodeBouquet(id);

  if (!data) {
    return (
      <div className="gift-page gift-page--error">
        <h1 className="display-sm">couldn't find this bouquet</h1>
        <button className="btn btn-primary" onClick={() => navigate('/')}>go home</button>
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
      <header className="gift-page__header">
        <button className="gift-page__logo btn-reset" onClick={() => navigate('/')}>Bouquetly</button>
        <button className="btn btn-outline" onClick={handleCopy} id="share-btn">
          {copied ? '✓ copied' : 'share'}
        </button>
      </header>

      <div className="gift-page__dedication animate-fade-in-up">
        <Flourish />
        <h1 className="display-sm">for {note.to || 'you'}</h1>
        <Flourish />
      </div>

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

      <footer className="gift-page__footer">
        <Flourish className="flourish--small" />
        <span className="body-sm" style={{ color: 'var(--outline)', opacity: 0.6 }}>
          <button
            className="btn-reset"
            onClick={() => navigate('/')}
            style={{ color: 'var(--primary)', cursor: 'pointer' }}
          >
            Bouquetly
          </button>
        </span>
      </footer>
    </div>
  );
}
