import { initials } from '../utils/format.js';

export default function Avatar({ person, size = 40, ring = false }) {
  const color = person?.color || '#3730A3';
  return (
    <span
      className={`avatar ${ring ? 'avatar--ring' : ''}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
        background: `linear-gradient(135deg, ${color}, ${color}bb)`,
      }}
      aria-hidden="true"
    >
      {initials(person?.name || 'MU')}
    </span>
  );
}
