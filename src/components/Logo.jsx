/** Market U brand mark: a dark shopping bag with a golden "U", on a gold tile. */
export default function Logo({ size = 36, showText = true, light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="mu-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFDB5C" />
            <stop offset="1" stopColor="#F29A1F" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#mu-grad)" />
        <path d="M25 24v-4a7 7 0 0 1 14 0v4" fill="none" stroke="#17161C" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="15" y="23" width="34" height="28" rx="8" fill="#17161C" />
        <path d="M26 30v7a6 6 0 0 0 12 0v-7" fill="none" stroke="#FFD447" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className="logo__text">
          Market<span className="logo__u">U</span>
        </span>
      )}
    </span>
  );
}
