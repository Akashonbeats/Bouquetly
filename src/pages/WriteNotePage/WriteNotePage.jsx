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
      </div>

      <div className="builder-page__content container">
        <div className="builder-page__split builder-page__split--note">
          <div className="note-form animate-fade-in-up">
            <div className="note-form__field">
              <label className="label-sm" htmlFor="note-to">To</label>
              <input
                id="note-to"
                type="text"
                className="note-form__input"
                placeholder="Who is this bouquet for?"
                value={note.to}
                onChange={(e) => handleChange('to', e.target.value)}
                maxLength={50}
              />
            </div>

            <div className="note-form__field">
              <label className="label-sm" htmlFor="note-message">Message</label>
              <textarea
                id="note-message"
                className="note-form__textarea"
                placeholder="Write a heartfelt message..."
                value={note.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={5}
                maxLength={300}
              />
              <span className="note-form__charcount body-sm">
                {note.message.length} / 300
              </span>
            </div>

            <div className="note-form__field">
              <label className="label-sm" htmlFor="note-from">From</label>
              <input
                id="note-from"
                type="text"
                className="note-form__input"
                placeholder="Your name"
                value={note.from}
                onChange={(e) => handleChange('from', e.target.value)}
                maxLength={50}
              />
            </div>
          </div>

          <div className="note-form__preview animate-fade-in">
            <span className="label-sm" style={{ color: 'var(--outline)', marginBottom: 'var(--space-4)', display: 'block' }}>
              Card Preview
            </span>
            <NoteCardPreview note={note} />
          </div>
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
