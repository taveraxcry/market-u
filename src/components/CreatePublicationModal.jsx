import { useState } from 'react';
import { Image as ImageIcon, Link2, Upload, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import {
  CONDITIONS, CONTACT_OPTIONS, EVENT_CATEGORIES, PRODUCT_CATEGORIES, SERVICE_CATEGORIES,
} from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import Modal from './Modal.jsx';
import { POST_TYPES } from './postTypes.js';

const TYPE_ORDER = ['general', 'producto', 'servicio', 'evento', 'emprendimiento'];
const TYPE_KEYS = {
  general: 'General', producto: 'Producto', servicio: 'Servicio', evento: 'Evento', emprendimiento: 'Emprendimiento',
};

const EMPTY = {
  text: '', title: '', price: '', category: '', condition: 'goodUsed', description: '', name: '',
  contact: 'market', date: '', time: '', location: '', image: '',
};

// Returns error message keys per field.
function validate(type, f) {
  const e = {};
  const need = (key, msgKey) => {
    if (!String(f[key] ?? '').trim()) e[key] = msgKey;
  };
  if (type === 'general') need('text', 'create.errText');
  if (type === 'producto') {
    need('title', 'create.errTitle');
    if (!f.price) e.price = 'create.errPrice';
    else if (Number(f.price) <= 0) e.price = 'create.errPricePositive';
    need('category', 'create.errCategory');
    need('description', 'create.errProductDesc');
  }
  if (type === 'servicio' || type === 'emprendimiento') {
    need('name', type === 'servicio' ? 'create.errServiceName' : 'create.errBusinessName');
    need('category', 'create.errCategory');
    need('description', 'create.errDesc');
    if (type === 'servicio') need('price', 'create.errRate');
  }
  if (type === 'evento') {
    need('name', 'create.errEventName');
    need('date', 'create.errDate');
    need('location', 'create.errLocation');
    need('category', 'create.errCategory');
    need('description', 'create.errEventDesc');
  }
  if (f.image && !f.image.startsWith('data:') && !/^https?:\/\/.+/i.test(f.image)) e.image = 'create.errImage';
  return e;
}

function Input({ id, label, error, required, children }) {
  const { t } = useI18n();
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>
        {label} {required && <span className="req" aria-hidden="true">*</span>}
      </label>
      <div className="field__control field__control--plain">{children}</div>
      {error && <p className="field__error" role="alert">{t(error)}</p>}
    </div>
  );
}

function CategorySelect({ value, onChange, options }) {
  const { t, tc } = useI18n();
  return (
    <select id="f-cat" value={value} onChange={onChange}>
      <option value="">{t('create.select')}</option>
      {options.map((c) => (
        <option key={c} value={c}>{tc(c)}</option>
      ))}
    </select>
  );
}

export function ImagePicker({ value, onChange, error }) {
  const { t } = useI18n();
  const [mode, setMode] = useState(value?.startsWith('data:') ? 'file' : 'url');

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <span className="field__label">
        {t('create.image')} <span className="muted">{t('create.optional')}</span>
      </span>
      <div className="segmented" role="tablist" aria-label={t('create.imageSource')}>
        <button type="button" role="tab" aria-selected={mode === 'url'} className={mode === 'url' ? 'is-active' : ''} onClick={() => setMode('url')}>
          <Link2 size={15} /> {t('create.link')}
        </button>
        <button type="button" role="tab" aria-selected={mode === 'file'} className={mode === 'file' ? 'is-active' : ''} onClick={() => setMode('file')}>
          <Upload size={15} /> {t('create.fromDevice')}
        </button>
      </div>
      {mode === 'url' ? (
        <div className="field__control field__control--plain">
          <input
            aria-label={t('create.urlLabel')}
            value={value.startsWith('data:') ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://…"
          />
        </div>
      ) : (
        <label className="dropzone">
          <input type="file" accept="image/*" onChange={onFile} className="sr-only" />
          <ImageIcon size={22} />
          <span>{t('create.choose')}</span>
          <small>{t('create.localOnly')}</small>
        </label>
      )}
      {error && <p className="field__error" role="alert">{t(error)}</p>}
      {value && !error && (
        <div className="img-preview">
          <img src={value} alt={t('create.preview')} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <button type="button" className="img-preview__remove" onClick={() => onChange('')} aria-label={t('create.removeImage')}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CreatePublicationModal() {
  const { createType } = useApp();
  // Mount a fresh form every time the modal opens.
  return createType ? <CreateForm initialType={createType} /> : null;
}

function CreateForm({ initialType }) {
  const { setCreateType, createPublication, user, setView } = useApp();
  const { t, tCondition, tContact } = useI18n();
  const [type, setType] = useState(initialType);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const changeType = (next) => {
    setType(next);
    setErrors({});
    setForm((f) => ({ ...f, category: '' }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(type, form);
    setErrors(found);
    if (Object.keys(found).length) return;
    const destination = createPublication(type, form);
    setView(destination);
  };

  const categories = type === 'producto' ? PRODUCT_CATEGORIES : type === 'evento' ? EVENT_CATEGORIES : SERVICE_CATEGORIES;
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <Modal open onClose={() => setCreateType(null)} title={t('create.title')} size="lg" className="modal--create">
      <form onSubmit={submit} noValidate className="create">
        <div className="create__author">
          <Avatar person={user} size={40} />
          <div>
            <strong>{user.name}</strong>
            <small>{t('create.publishingIn')}</small>
          </div>
        </div>

        <fieldset className="type-picker">
          <legend>{t('create.question')}</legend>
          {TYPE_ORDER.map((key) => {
            const meta = POST_TYPES[key];
            const Icon = meta.icon;
            return (
              <label key={key} className={`type-option type-option--${meta.tone} ${type === key ? 'is-active' : ''}`}>
                <input type="radio" name="pub-type" value={key} checked={type === key} onChange={() => changeType(key)} className="sr-only" />
                <span className="type-option__icon"><Icon size={20} /></span>
                <strong>{t(`create.t${TYPE_KEYS[key]}`)}</strong>
                <small>{t(`create.h${TYPE_KEYS[key]}`)}</small>
              </label>
            );
          })}
        </fieldset>

        {hasErrors && (
          <div className="notice notice--error" role="alert">
            {t('create.reviewErrors')}
          </div>
        )}

        <div className="create__fields">
          {type === 'general' && (
            <Input id="f-text" label={t('create.text')} error={errors.text} required>
              <textarea id="f-text" rows={4} value={form.text} onChange={set('text')} placeholder={t('create.textPh')} />
            </Input>
          )}

          {type === 'producto' && (
            <>
              <Input id="f-title" label={t('create.productTitle')} error={errors.title} required>
                <input id="f-title" value={form.title} onChange={set('title')} placeholder={t('create.productTitlePh')} maxLength={80} />
              </Input>
              <div className="field-grid">
                <Input id="f-price" label={t('create.price')} error={errors.price} required>
                  <span className="field__prefix">$</span>
                  <input id="f-price" type="number" min="0" step="1000" inputMode="numeric" value={form.price} onChange={set('price')} placeholder="50000" />
                </Input>
                <Input id="f-cat" label={t('create.category')} error={errors.category} required>
                  <CategorySelect value={form.category} onChange={set('category')} options={categories} />
                </Input>
              </div>
              <Input id="f-cond" label={t('create.condition')}>
                <select id="f-cond" value={form.condition} onChange={set('condition')}>
                  {CONDITIONS.map((c) => <option key={c} value={c}>{tCondition(c)}</option>)}
                </select>
              </Input>
              <Input id="f-desc" label={t('create.description')} error={errors.description} required>
                <textarea id="f-desc" rows={3} value={form.description} onChange={set('description')} placeholder={t('create.productDescPh')} />
              </Input>
            </>
          )}

          {(type === 'servicio' || type === 'emprendimiento') && (
            <>
              <Input id="f-name" label={type === 'servicio' ? t('create.serviceName') : t('create.businessName')} error={errors.name} required>
                <input
                  id="f-name"
                  value={form.name}
                  onChange={set('name')}
                  placeholder={type === 'servicio' ? t('create.serviceNamePh') : t('create.businessNamePh')}
                  maxLength={80}
                />
              </Input>
              <div className="field-grid">
                <Input id="f-cat" label={t('create.category')} error={errors.category} required>
                  <CategorySelect value={form.category} onChange={set('category')} options={categories} />
                </Input>
                <Input
                  id="f-price"
                  label={type === 'servicio' ? t('create.rate') : t('create.pricesOptional')}
                  error={errors.price}
                  required={type === 'servicio'}
                >
                  <input id="f-price" value={form.price} onChange={set('price')} placeholder={t('create.ratePh')} />
                </Input>
              </div>
              <Input id="f-desc" label={t('create.description')} error={errors.description} required>
                <textarea id="f-desc" rows={3} value={form.description} onChange={set('description')} placeholder={t('create.serviceDescPh')} />
              </Input>
              {type === 'servicio' && (
                <Input id="f-contact" label={t('create.contactMethod')}>
                  <select id="f-contact" value={form.contact} onChange={set('contact')}>
                    {CONTACT_OPTIONS.map((c) => <option key={c} value={c}>{tContact(c)}</option>)}
                  </select>
                </Input>
              )}
            </>
          )}

          {type === 'evento' && (
            <>
              <Input id="f-name" label={t('create.eventName')} error={errors.name} required>
                <input id="f-name" value={form.name} onChange={set('name')} placeholder={t('create.eventNamePh')} maxLength={80} />
              </Input>
              <div className="field-grid">
                <Input id="f-date" label={t('create.date')} error={errors.date} required>
                  <input id="f-date" type="date" value={form.date} onChange={set('date')} />
                </Input>
                <Input id="f-time" label={t('create.time')}>
                  <input id="f-time" type="time" value={form.time} onChange={set('time')} />
                </Input>
              </div>
              <div className="field-grid">
                <Input id="f-loc" label={t('create.location')} error={errors.location} required>
                  <input id="f-loc" value={form.location} onChange={set('location')} placeholder={t('create.locationPh')} />
                </Input>
                <Input id="f-cat" label={t('create.category')} error={errors.category} required>
                  <CategorySelect value={form.category} onChange={set('category')} options={categories} />
                </Input>
              </div>
              <Input id="f-desc" label={t('create.description')} error={errors.description} required>
                <textarea id="f-desc" rows={3} value={form.description} onChange={set('description')} placeholder={t('create.eventDescPh')} />
              </Input>
            </>
          )}

          <ImagePicker value={form.image} onChange={set('image')} error={errors.image} />
        </div>

        <div className="create__footer">
          <p className="muted">{t('create.footNote')}</p>
          <div className="create__buttons">
            <button type="button" className="btn btn--ghost" onClick={() => setCreateType(null)}>{t('common.cancel')}</button>
            <button type="submit" className="btn btn--primary">{t('common.publish')}</button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
