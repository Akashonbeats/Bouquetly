import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span className="footer__brand">Bouquetly</span>
        <span className="footer__text">
          Made with Bouquetly Curated Atelier &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
