import { SearchX } from 'lucide-react';

export default function EmptyState({ icon: Icon = SearchX, title, text, action }) {
  return (
    <div className="empty">
      <div className="empty__icon">
        <Icon size={28} />
      </div>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action}
    </div>
  );
}
