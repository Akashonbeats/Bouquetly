import { useTransitionNavigate } from '../../hooks/useTransitionNavigate';
import { useBouquet, useBouquetDispatch } from '../../context/BouquetContext';
import { encodeBouquet } from '../../utils/bouquetEncoder';
import NoteCardPreview from '../../components/NoteCardPreview/NoteCardPreview';
import '../BuilderPage.css';

export default function WriteNotePage() {
  const state = useBouquet();
  const dispatch = useBouquetDispatch();
  const navigate = useTransitionNavigate();

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
      <div className="builder-page__body">
        <h1 className="display-sm">write your note</h1>

        <div className="write-note__card-wrapper animate-scale-in">
          <NoteCardPreview
            note={note}
            editable={true}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="builder-page__nav container">
        <button className="btn btn-text" onClick={() => navigate('/build/bouquet')}>← back</button>
        <button
          className="btn btn-primary"
          disabled={!canCreate}
          onClick={handleCreate}
          id="create-bouquet"
        >
          create ✿
        </button>
      </div>
    </div>
  );
}
