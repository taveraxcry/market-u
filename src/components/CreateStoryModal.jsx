import { useState } from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { STORY_BACKGROUNDS } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import { ImagePicker } from './CreatePublicationModal.jsx';
import Modal from './Modal.jsx';

const MAX = 140;

export default function CreateStoryModal() {
  const { createStoryOpen, setCreateStoryOpen } = useApp();
  return createStoryOpen ? <CreateStoryForm onClose={() => setCreateStoryOpen(false)} /> : null;
}

function CreateStoryForm({ onClose }) {
  const { addStory, user } = useApp();
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [bg, setBg] = useState('sunset');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const background = STORY_BACKGROUNDS[bg];
  const imageError = image && !image.startsWith('data:') && !/^https?:\/\/.+/i.test(image) ? 'create.errImage' : null;

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) {
      setError(t('stories.errEmpty'));
      return;
    }
    if (imageError) return;
    addStory({ text: text.trim(), bg, image });
  };

  return (
    <Modal open onClose={onClose} title={t('stories.createTitle')} size="lg" className="modal--story">
      <form className="story-create" onSubmit={submit} noValidate>
        <div className="story-create__form">
          <div className={`field ${error ? 'field--error' : ''}`}>
            <label htmlFor="story-text">{t('stories.textLabel')}</label>
            <div className="field__control field__control--plain">
              <textarea
                id="story-text"
                rows={3}
                maxLength={MAX}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError('');
                }}
                placeholder={t('stories.textPh')}
              />
            </div>
            <p className="field__hint story-create__count">{text.length}/{MAX}</p>
            {error && <p className="field__error" role="alert">{error}</p>}
          </div>

          {!image && (
            <div className="field">
              <span className="field__label">{t('stories.background')}</span>
              <div className="swatches" role="radiogroup" aria-label={t('stories.background')}>
                {Object.entries(STORY_BACKGROUNDS).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={bg === key}
                    aria-label={key}
                    className={`swatch ${bg === key ? 'is-active' : ''}`}
                    style={{ background: value.css }}
                    onClick={() => setBg(key)}
                  >
                    {bg === key && <Check size={16} color={value.ink ? '#17161C' : '#fff'} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ImagePicker
            value={image}
            onChange={(v) => {
              setImage(v);
              setError('');
            }}
            error={imageError}
          />
        </div>

        <div className="story-create__preview">
          <span className="field__label">{t('stories.preview')}</span>
          <div className="story-preview" style={image ? undefined : { background: background.css }}>
            {image && <img src={image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
            <div className="story-preview__bars"><span /></div>
            <div className="story-preview__head">
              <Avatar person={user} size={24} />
              <strong>{t('stories.yours')}</strong>
            </div>
            {text && (
              <p className={`story-preview__text ${image ? 'is-caption' : ''} ${!image && background.ink ? 'is-ink' : ''}`}>{text}</p>
            )}
          </div>
        </div>
        <div className="story-create__submit">
          <button type="submit" className="btn btn--primary btn--block btn--lg">{t('stories.share')}</button>
        </div>
      </form>
    </Modal>
  );
}
