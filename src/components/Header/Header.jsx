import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className={`header ${isLanding ? 'header--transparent' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          Bouquetly
        </Link>
        <nav className="header__nav">
          <Link to="/build/flowers" className="header__link">Build</Link>
          <Link to="/" className="header__link">Gallery</Link>
          <Link to="/" className="header__link">About</Link>
        </nav>
      </div>
    </header>
  );
}
