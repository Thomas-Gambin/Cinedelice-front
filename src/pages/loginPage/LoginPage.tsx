import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "./loginPage.scss";
import { LoginSchema } from "../../validators/authValidator";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { login } = useAuth();
  const naviagte = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    const { error } = LoginSchema.validate(
      {
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
      toast.error("Veuillez corriger les erreurs de validation !");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      const refreshToken = response.data.refreshToken;

      login(token, refreshToken);

      toast.success("Connexion réussie !", {
        hideProgressBar: true,
        autoClose: 2000,
      });

      naviagte("/");
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Erreur lors de la connexion !");
    }
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <div className="login__container">
        <h1>Connexion</h1>
        <div className="login__container__input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChangeEmail}
            value={email}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={handleChangePassword}
            value={password}
          />
        </div>
        {validationErrors.length > 0 && (
          <div className="login__container__errors">
            {validationErrors.map((error) => (
              <p key={validationErrors.indexOf(error)}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit">Se connecter</button>
      </div>
    </form>
  );
}
