import { useNavigate } from 'react-router-dom';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';
import { encodeBouquet } from '../../utils/bouquetEncoder';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import NoteCardPreview from '../../components/NoteCardPreview/NoteCardPreview';
import '../BuilderPage.css';

export default function WriteNotePage() {
  const state = useBouquet();
  const dispatch = useBouquetDispatch();
  const navigate = useNavigate();

  const { note } = state;
  const canCreate = note.to.trim() && note.from.trim() && note.message.trim();

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_NOTE', payload: { [field]: value } });
  };

  const handleCreate = () => {
    const id = encodeBouquet(state);
    navigate(`/bouquet/${id}`);
  };

  return (
    <div className="builder-page">
      <div className="builder-page__header container">
        <StepIndicator current={3} />
        <h1 className="display-sm">Write your note.</h1>
        <p className="body-sm" style={{ color: 'var(--outline)' }}>
          Click on the card below to personalize your message.
        </p>
      </div>

      <div className="builder-page__content container">
        <div className="write-note__card-wrapper animate-fade-in-up">
          <NoteCardPreview
            note={note}
            editable={true}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="builder-page__nav container">
        <button className="btn btn-text" onClick={() => navigate('/build/bouquet')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button
          className="btn btn-primary"
          disabled={!canCreate}
          onClick={handleCreate}
          id="create-bouquet"
        >
          Create My Bouquet ✿
        </button>
      </div>
    </div>
  );
}
