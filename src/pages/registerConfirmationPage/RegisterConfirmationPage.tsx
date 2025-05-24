import { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";
import "./registerConfirmationPage.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../App";

export default function RegisterConfirmation() {
  const [code, setCode] = useState<string>("");
  const { user, IsAuthenticated } = useAuth();

  const navigate = useNavigate();

  const blockForUnauthenticatedUsers = useCallback(async () => {
    const isAuthenticated = await IsAuthenticated();
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [IsAuthenticated, navigate]);

  const blockConfirmedUsers = useCallback(() => {
    if (user?.isConfirmed) {
      navigate(ROUTES.HOME);
    }
  }, [user, navigate]);

  useEffect(() => {
    blockForUnauthenticatedUsers();
    blockConfirmedUsers();
  }, [blockForUnauthenticatedUsers, blockConfirmedUsers]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!user) {
        toast.error("Utilisateur non trouvé");
        return;
      }
      await api.post("/auth/confirm", {
        email: user.email,
        code,
      });

      navigate(ROUTES.HOME);
    } catch (e) {
      console.log(e);
      toast.error("Une erreur est survenue lors de la confirmation");
    }
  };
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="confirmation">
      <div className="confirmation__container">
        <p>
          Un code de confirmation a été envoyé à votre adresse e-mail. Veuillez
          le saisir ci-dessous pour confirmer votre inscription.
        </p>
        <div className="confirmation__container__input">
          <label htmlFor="code">Code de confirmation</label>
          <input
            type="text"
            value={code}
            onChange={handleChangeCode}
            placeholder="Code"
          />
        </div>
        <button type="submit">Confirmer l'inscription</button>
      </div>
    </form>
  );
}
