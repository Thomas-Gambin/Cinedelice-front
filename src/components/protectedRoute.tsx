import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import { ROUTES } from "../App";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const token = jsCookie.get("token");

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.LOGIN);
    }
  }, [token, navigate]);

  return <>{token ? children : null}</>;
}
