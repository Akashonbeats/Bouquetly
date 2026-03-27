import './NoteCardPreview.css';

/**
 * NoteCardPreview — The gift card component.
 * When `editable` is true, the "to", "message", and "from" fields become
 * inline inputs so the user types directly on the card.
 */
export default function NoteCardPreview({ note, editable = false, onChange }) {
  const { message, from, to } = note;

  const handleChange = (field, value) => {
    if (onChange) onChange(field, value);
  };

  return (
    <div className="note-card-preview">
      <div className="note-card-preview__inner">
        <div className="note-card-preview__header">
          <span className="note-card-preview__flourish">✿</span>
        </div>
        <div className="note-card-preview__body">
          {/* TO field */}
          <div className="note-card-preview__to-line">
            <span className="note-card-preview__to-label headline-md">For </span>
            {editable ? (
              <input
                type="text"
                className="note-card-preview__inline-input note-card-preview__inline-input--to headline-md"
                placeholder="someone special"
                value={to}
                onChange={(e) => handleChange('to', e.target.value)}
                maxLength={50}
              />
            ) : (
              <span className="note-card-preview__to headline-md">
                {to || 'someone special'},
              </span>
            )}
          </div>

          {/* MESSAGE field */}
          {editable ? (
            <textarea
              className="note-card-preview__inline-textarea body-md"
              placeholder="Write your heartfelt message here..."
              value={message}
              onChange={(e) => handleChange('message', e.target.value)}
              maxLength={300}
              rows={4}
            />
          ) : (
            <p className="note-card-preview__message body-md">
              {message || 'Your heartfelt message will appear here...'}
            </p>
          )}

          {editable && (
            <span className="note-card-preview__charcount">
              {message.length} / 300
            </span>
          )}
        </div>
        <div className="note-card-preview__footer">
          <span className="note-card-preview__from-label">With Love, </span>
          {editable ? (
            <input
              type="text"
              className="note-card-preview__inline-input note-card-preview__inline-input--from"
              placeholder="your name"
              value={from}
              onChange={(e) => handleChange('from', e.target.value)}
              maxLength={50}
            />
          ) : (
            <span className="note-card-preview__from-name">
              {from || 'you'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
