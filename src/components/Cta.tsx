import Link from 'next/link';

// The primary action. Hover: a green disc radiates from the pointer, the pin climbs from 3 to 1
// and the label rolls (setup.ts + .btn in globals.css). Touch and keyboard get the same end state.
export function Cta({ href = '/contact/', label, light = false, className = '' }: { href?: string; label: string; light?: boolean; className?: string }) {
  return (
    <Link href={href} className={`btn ${light ? 'btn--light' : ''} ${className}`} data-fill data-label={label}>
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__pin" aria-hidden="true"><span>3</span><span>1</span></span>
      <span className="roll"><span>{label}</span><span aria-hidden="true">{label}</span></span>
    </Link>
  );
}

export function BrandMark() {
  return (
    <svg viewBox="0 0 32 28" aria-hidden="true">
      <path fill="currentColor" d="M8 1h16l7 9-15 17L1 10z" />
      <path fill="none" stroke="var(--ground)" strokeWidth="1.3" strokeLinejoin="round" d="M1.5 10h29M8 1l4 9 4-9 4 9 4-9M12 10l4 16.5 4-16.5" />
    </svg>
  );
}
