import { useState } from 'react';
import {
  ArrowRight, BadgeCheck, CalendarDays, Eye, EyeOff, Heart, Info, Lock, Mail, Rocket, ShieldCheck, Sparkles, Store,
  User, Users,
} from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle.jsx';
import Logo from '../components/Logo.jsx';
import Modal from '../components/Modal.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { useApp } from '../context/AppContext.jsx';
import { DEMO_CREDENTIALS, DEMO_NAME, UNIVERSITIES, initialEvents, initialProducts } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { formatCOP, isValidEmail } from '../utils/format.js';

const AVATAR_COLORS = ['#B8306F', '#7A3B9A', '#D4461F', '#1F8A5B', '#9A6200', '#34323D'];

function nameFromEmail(email) {
  const local = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim();
  if (!local || email.toLowerCase() === DEMO_CREDENTIALS.email) return DEMO_NAME;
  return local
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

function Field({ id, label, icon: Icon, error, children, hint }) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="field__control">
        {Icon && <Icon size={18} className="field__icon" aria-hidden="true" />}
        {children}
      </div>
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">{error}</p>
      ) : (
        hint && <p className="field__hint">{hint}</p>
      )}
    </div>
  );
}

function PasswordInput({ id, value, onChange, placeholder, error, autoComplete }) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        className="field__toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? t('auth.hidePassword') : t('auth.showPassword')}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </>
  );
}

function LoginForm({ onSwitch, onForgot }) {
  const { login } = useApp();
  const { t } = useI18n();
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.email.trim()) next.email = 'auth.errEmailRequired';
    else if (!isValidEmail(form.email)) next.email = 'auth.errEmailInvalid';
    if (!form.password) next.password = 'auth.errPasswordRequired';
    else if (form.password.length < 6) next.password = 'auth.errPassword6';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      const email = form.email.trim().toLowerCase();
      login(
        {
          name: nameFromEmail(email),
          email,
          program: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
          university: 'Universidad Autónoma de Manizales',
          color: '#B8306F',
        },
        form.remember
      );
    }, 650);
  };

  const fillDemo = () => {
    setForm((f) => ({ ...f, email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password }));
    setErrors({});
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <div className="auth-card__head">
        <h2>{t('auth.loginTitle')}</h2>
        <p>{t('auth.loginSubtitle')}</p>
      </div>

      <button type="button" className="demo-banner" onClick={fillDemo}>
        <Sparkles size={18} />
        <span>
          <strong>{t('auth.demoTitle')}</strong>
          <small>{DEMO_CREDENTIALS.email} · {DEMO_CREDENTIALS.password}</small>
        </span>
        <ArrowRight size={16} />
      </button>

      <Field id="login-email" label={t('auth.email')} icon={Mail} error={errors.email && t(errors.email)}>
        <input
          id="login-email"
          type="email"
          value={form.email}
          onChange={update('email')}
          placeholder={t('auth.emailPh')}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'login-email-error' : undefined}
        />
      </Field>

      <Field id="login-password" label={t('auth.password')} icon={Lock} error={errors.password && t(errors.password)}>
        <PasswordInput
          id="login-password"
          value={form.password}
          onChange={update('password')}
          placeholder={t('auth.passwordPh')}
          error={errors.password}
          autoComplete="current-password"
        />
      </Field>

      <div className="auth-form__row">
        <label className="checkbox">
          <input type="checkbox" checked={form.remember} onChange={update('remember')} />
          <span>{t('auth.remember')}</span>
        </label>
        <button type="button" className="link-btn" onClick={onForgot}>
          {t('auth.forgot')}
        </button>
      </div>

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={loading}>
        {loading ? <span className="spinner" aria-hidden="true" /> : null}
        {loading ? t('auth.loggingIn') : t('auth.login')}
      </button>

      <div className="divider"><span>{t('auth.newHere')}</span></div>

      <button type="button" className="btn btn--outline btn--lg btn--block" onClick={onSwitch}>
        {t('auth.createAccount')}
      </button>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const { login } = useApp();
  const { t, tAll } = useI18n();
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', university: 'uam', terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 3) next.name = 'auth.errName';
    if (!form.email.trim()) next.email = 'auth.errEmailRequired';
    else if (!isValidEmail(form.email)) next.email = 'auth.errEmailInvalidShort';
    if (form.password.length < 8) next.password = 'auth.errPassword8';
    else if (!/\d/.test(form.password)) next.password = 'auth.errPasswordNumber';
    if (!form.confirm) next.confirm = 'auth.errConfirmRequired';
    else if (form.confirm !== form.password) next.confirm = 'auth.errConfirmMismatch';
    if (!form.university) next.university = 'auth.errUniversity';
    if (!form.terms) next.terms = 'auth.errTerms';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const uni = UNIVERSITIES.find((u) => u.id === form.university);
    setTimeout(() => {
      // Registro simulado: la contraseña nunca se guarda.
      login(
        {
          name: form.name.trim().replace(/\s+/g, ' '),
          email: form.email.trim().toLowerCase(),
          program: tAll('auto.student'),
          university: uni?.name || 'Universidad Autónoma de Manizales',
          color: AVATAR_COLORS[form.name.length % AVATAR_COLORS.length],
        },
        true
      );
    }, 900);
  };

  const err = (key) => errors[key] && t(errors[key]);

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <div className="auth-card__head">
        <h2>{t('auth.registerTitle')}</h2>
        <p>{t('auth.registerSubtitle')}</p>
      </div>

      <Field id="reg-name" label={t('auth.name')} icon={User} error={err('name')}>
        <input id="reg-name" value={form.name} onChange={update('name')} placeholder={t('auth.namePh')} autoComplete="name" aria-invalid={Boolean(errors.name)} />
      </Field>

      <Field id="reg-email" label={t('auth.email')} icon={Mail} error={err('email')} hint={t('auth.emailHint')}>
        <input id="reg-email" type="email" value={form.email} onChange={update('email')} placeholder={t('auth.emailPh')} autoComplete="email" aria-invalid={Boolean(errors.email)} />
      </Field>

      <div className="field-grid">
        <Field id="reg-password" label={t('auth.password')} icon={Lock} error={err('password')}>
          <PasswordInput id="reg-password" value={form.password} onChange={update('password')} placeholder={t('auth.passwordPh8')} error={errors.password} autoComplete="new-password" />
        </Field>
        <Field id="reg-confirm" label={t('auth.confirm')} icon={Lock} error={err('confirm')}>
          <PasswordInput id="reg-confirm" value={form.confirm} onChange={update('confirm')} placeholder={t('auth.confirmPh')} error={errors.confirm} autoComplete="new-password" />
        </Field>
      </div>

      <Field id="reg-university" label={t('auth.university')} error={err('university')}>
        <select id="reg-university" value={form.university} onChange={update('university')}>
          {UNIVERSITIES.map((u) => (
            <option key={u.id} value={u.id} disabled={!u.available}>
              {u.name || t(u.nameKey)}
            </option>
          ))}
        </select>
      </Field>

      <div className="notice notice--info">
        <ShieldCheck size={18} />
        <p>
          {t('auth.verifyA')} <strong>{t('auth.verifyB')}</strong>
        </p>
      </div>

      <label className={`checkbox ${errors.terms ? 'checkbox--error' : ''}`}>
        <input type="checkbox" checked={form.terms} onChange={update('terms')} />
        <span>{t('auth.terms')}</span>
      </label>
      {errors.terms && <p className="field__error" role="alert">{t(errors.terms)}</p>}

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={loading}>
        {loading ? <span className="spinner" aria-hidden="true" /> : null}
        {loading ? t('auth.creating') : t('auth.createMine')}
      </button>

      <p className="auth-form__switch">
        {t('auth.haveAccount')}{' '}
        <button type="button" className="link-btn" onClick={onSwitch}>
          {t('auth.goLogin')}
        </button>
      </p>
    </form>
  );
}

function HeroPreview() {
  const { t, tx } = useI18n();
  const product = initialProducts[3];
  const event = initialEvents[0];
  return (
    <div className="preview" aria-hidden="true">
      <div className="preview__card preview__card--event">
        <SmartImage src={event.image} alt="" category={event.category} className="preview__img" />
        <div className="preview__body">
          <span className="pill pill--coral"><CalendarDays size={12} /> {t('auth.previewEvent')}</span>
          <strong>{tx(event.name)}</strong>
          <small><Users size={12} /> {t('auth.previewInterested', { n: event.interested })}</small>
        </div>
      </div>
      <div className="preview__card preview__card--product">
        <SmartImage src={product.image} alt="" category={product.category} className="preview__img" />
        <div className="preview__body">
          <strong>{formatCOP(product.price)}</strong>
          <small>{tx(product.title)}</small>
        </div>
        <span className="preview__heart"><Heart size={14} fill="currentColor" /></span>
      </div>
      <div className="preview__card preview__card--service">
        <span className="preview__icon"><Rocket size={18} /></span>
        <div>
          <strong>Dulce Campus</strong>
          <small>{t('auth.previewBusiness')}</small>
        </div>
        <span className="pill pill--green">{t('auth.previewNew')}</span>
      </div>
      <div className="preview__glow" />
    </div>
  );
}

export default function AuthScreen() {
  const { t } = useI18n();
  const [mode, setMode] = useState('login');
  const [forgotOpen, setForgotOpen] = useState(false);

  return (
    <div className="auth">
      <div className="auth__panel-top">
        <LanguageToggle />
      </div>
      <section className="auth__hero">
        <div className="auth__hero-bg" aria-hidden="true">
          <span className="blob blob--1" />
          <span className="blob blob--2" />
          <span className="grid-pattern" />
        </div>
        <div className="auth__hero-inner">
          <Logo size={44} light />
          <p className="tagline">Your University. Your Community. Your Market.</p>
          <h1>
            {t('auth.headlineA')} <span className="hl">{t('auth.headlineB')}</span>
          </h1>
          <p className="auth__lead">{t('auth.lead')}</p>
          <ul className="auth__features">
            <li><Store size={18} /> {t('auth.featMarket')}</li>
            <li><Rocket size={18} /> {t('auth.featServices')}</li>
            <li><CalendarDays size={18} /> {t('auth.featEvents')}</li>
          </ul>
          <HeroPreview />
          <p className="auth__pilot">
            <BadgeCheck size={16} /> {t('auth.pilot')}
          </p>
        </div>
      </section>

      <section className="auth__panel">
        <div className="auth-card" key={mode}>
          {mode === 'login' ? (
            <LoginForm onSwitch={() => setMode('register')} onForgot={() => setForgotOpen(true)} />
          ) : (
            <RegisterForm onSwitch={() => setMode('login')} />
          )}
        </div>
        <p className="auth__disclaimer">
          <Info size={14} /> {t('auth.disclaimer')}
        </p>
      </section>

      <Modal open={forgotOpen} onClose={() => setForgotOpen(false)} title={t('auth.forgotTitle')} size="sm">
        <div className="forgot">
          <span className="forgot__icon"><Mail size={26} /></span>
          <p>{t('auth.forgotP1')}</p>
          <p className="muted">{t('auth.forgotP2')}</p>
          <button className="btn btn--primary btn--block" onClick={() => setForgotOpen(false)}>
            {t('auth.forgotOk')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
