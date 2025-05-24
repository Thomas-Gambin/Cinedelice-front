import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../button/button";
import "./header.scss";
import { ROUTES } from "../../App";

export default function Header() {
  const { IsAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await IsAuthenticated();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, [IsAuthenticated]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <Link to={ROUTES.HOME}>CinéDélices</Link>

      <button type="button" className="burger-menu" onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </button>

      <nav className={menuOpen ? "mobile-active" : ""}>
        <Link to={ROUTES.HOME} onClick={() => setMenuOpen(false)}>
          Accueil
        </Link>
        <Link to={ROUTES.RECIPES} onClick={() => setMenuOpen(false)}>
          Recettes
        </Link>
        <Link to={ROUTES.MEDIAS} onClick={() => setMenuOpen(false)}>
          Films/Séries
        </Link>
        {isAuthenticated ? (
          <>
            <Link to={ROUTES.ADD_RECIPE} onClick={() => setMenuOpen(false)}>
              Ajouter une recette
            </Link>
            <Button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Link to={ROUTES.REGISTER} onClick={() => setMenuOpen(false)}>
              Inscription
            </Link>
            <Link to={ROUTES.LOGIN} onClick={() => setMenuOpen(false)}>
              Connexion
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
