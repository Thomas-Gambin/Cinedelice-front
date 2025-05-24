import { Link } from "react-router-dom";
import "./footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/about">À propos</Link>
        <Link to="/legal">Mentions légales</Link>
        <Link to="/social">Réseaux sociaux</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="footer-copy">
        &copy; 2025 Thomas Gambin – Tous droits réservés
      </div>
    </footer>
  );
}
