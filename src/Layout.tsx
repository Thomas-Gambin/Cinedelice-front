import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ContextWrappers from "./components/ContextWrappers";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

export default function Layout() {
  return (
    <ContextWrappers>
      <Header />
      <main>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </ContextWrappers>
  );
}
