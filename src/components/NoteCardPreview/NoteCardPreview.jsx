import './NoteCardPreview.css';

export default function NoteCardPreview({ note }) {
  const { message, from, to } = note;

  return (
    <div className="note-card-preview">
      <div className="note-card-preview__inner">
        <div className="note-card-preview__header">
          <span className="note-card-preview__flourish">✿</span>
        </div>
        <div className="note-card-preview__body">
          {to && (
            <p className="note-card-preview__to headline-md">
              For {to},
            </p>
          )}
          <p className="note-card-preview__message body-md">
            {message || 'Your heartfelt message will appear here...'}
          </p>
        </div>
        <div className="note-card-preview__footer">
          {from && (
            <p className="note-card-preview__from">
              With Love, <span>{from}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
