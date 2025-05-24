import { Link } from "react-router-dom";
import "./404.scss";

export default function NotFoundPage() {
    return (
        <div className="notfound">
            <h1 className="notfound__title">404</h1>
            <p className="notfound__message">Oupsi ! Cette page n'existe malheuresement pas.</p>
            <Link to="/" className="notfound__link">
                    Retour à l'accueil
            </Link>
        </div>
    );
}