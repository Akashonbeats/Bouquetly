import { useRef, useEffect, useLayoutEffect } from 'react';
import './NoteCardPreview.css';

/**
 * GrowingInput — an <input> that shrinks/grows to fit its content width.
 * A hidden sizer span with identical font styles is measured on every
 * value/placeholder change; the input's width is set to match.
 */
function GrowingInput({ value, placeholder, className, sizerClassName, ...props }) {
  const inputRef = useRef(null);
  const sizerRef = useRef(null);

  useLayoutEffect(() => {
    if (sizerRef.current && inputRef.current) {
      // +4px gives the caret a little breathing room at the end
      inputRef.current.style.width = `${sizerRef.current.offsetWidth + 4}px`;
    }
  }, [value, placeholder]);

  return (
    <span className="growing-input-wrap">
      {/* Invisible mirror — same font, used only for measurement */}
      <span
        ref={sizerRef}
        className={`growing-input__sizer ${sizerClassName ?? ''} ${className ?? ''}`}
        aria-hidden="true"
      >
        {value || placeholder || ''}
      </span>
      <input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        className={className}
        {...props}
      />
    </span>
  );
}

/**
 * NoteCardPreview — The gift card component.
 * When `editable` is true, fields become inline inputs that grow with content.
 */
export default function NoteCardPreview({ note, editable = false, onChange }) {
  const { message, from, to } = note;
  const textareaRef = useRef(null);

  const handleChange = (field, value) => {
    if (onChange) onChange(field, value);
  };

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleMessageChange = (e) => {
    handleChange('message', e.target.value);
    autoResize(e.target);
  };

  useEffect(() => {
    if (editable) autoResize(textareaRef.current);
  }, [editable]);

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
              <GrowingInput
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
              ref={textareaRef}
              className="note-card-preview__inline-textarea body-md"
              placeholder="Write your heartfelt message here..."
              value={message}
              onChange={handleMessageChange}
              maxLength={300}
              rows={2}
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
            <GrowingInput
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
