import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  // On landing page, header is hidden (logo is in the hero)
  if (isLanding) return null;

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Bouquetly
      </Link>
    </header>
  );
}
