export default function PageHeader({ icon: Icon, title, subtitle, action, tone = 'indigo', children }) {
  return (
    <header className={`page-header page-header--${tone}`}>
      <div className="page-header__row">
        <div className="page-header__text">
          {Icon && (
            <span className="page-header__icon">
              <Icon size={26} />
            </span>
          )}
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
    </header>
  );
}
