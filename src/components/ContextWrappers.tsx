import { AuthProvider } from "../context/AuthContext";

export default function ContextWrappers({
  children,
}: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
