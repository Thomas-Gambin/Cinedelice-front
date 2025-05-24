import { useEffect, useState } from "react";
import api from "../../utils/api";
import { RegisterSchema } from "../../validators/authValidator";
import "./registerPage.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../App";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { login } = useAuth();

  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    validateForm();
  }, [username, email, password]);

  const validateForm = () => {
    const { error } = RegisterSchema.validate(
      {
        username,
        email,
        password,
      },
      { abortEarly: false },
    );

    if (error) {
      const errors = error.details.map((err) => err.message);
      setValidationErrors(errors);
      return false;
    }

    setValidationErrors([]);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();

    if (validationErrors.length > 0) {
      toast.error("Veuillez corriger les erreurs de validation.");
      return;
    }

    try {
      const request = await api.post("/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      const { token, refreshToken } = request.data;
      login(token, refreshToken);
      navigate(ROUTES.REGISTER_CONFIRMATION);
    } catch (e) {
      console.log(e);
      toast.error("Une erreur est survenue lors de l'inscription");
    }
  };
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="register">
      <div className="register__container">
        <h1>
          Inscription
          <span className="register__container__subtitle">
            Créez votre compte pour profiter de toutes les fonctionnalités
          </span>
        </h1>
        <div className="register__container__input">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={handleChangeUsername}
            placeholder="Username"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Mot de passe"
          />
        </div>
        {validationErrors.length > 0 && (
          <div className="register__container__errors">
            {validationErrors.map((error) => (
              <p key={validationErrors.indexOf(error)}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit">S'inscrire</button>
      </div>
    </form>
  );
}
