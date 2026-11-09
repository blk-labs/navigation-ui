import { Link } from 'react-router-dom';

export default function Logo({ type }: { type?: 'header' | 'footer' }) {
  return (
    <Link to="/" className="w-fit">
      <img
        className={type === 'header' ? 'max-w-19 md:max-w-25' : 'max-w-39.5 md:max-w-50'}
        src={type === 'header' ? '/images/logo.png' : '/images/footer-logo.png'}
        alt="empower_her_logo"
      />
    </Link>
  );
}
