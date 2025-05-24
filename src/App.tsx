import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import AddRecipePage from "./pages/addRecipePage/AddRecipePage";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import MediaPage from "./pages/mediaPage/MediaPage";
import RecipePage from "./pages/recipePage/RecipePage";
import RecipesListPage from "./pages/recipesListPage/RecipesListPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import RegisterConfirmation from "./pages/registerConfirmationPage/RegisterConfirmationPage";
import MediasListPage from "./pages/mediasListPage/MediasListPage";
import ProtectedRoute from "./components/protectedRoute";
import NotFoundPage from "./pages/404Page/404";

export const ROUTES = {
  HOME: "/",
  RECIPES: "/recipes",
  RECIPE: "/recipes/:recipeid",
  ADD_RECIPE: "/recipes/create",
  MEDIAS: "/medias",
  MEDIA: "/media/:mediaid",
  REGISTER: "/auth/register",
  REGISTER_CONFIRMATION: "/auth/confirmation",
  LOGIN: "/auth/login",
};

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.RECIPES} element={<RecipesListPage />} />
        <Route path={ROUTES.RECIPE} element={<RecipePage />} />
        <Route
          path={ROUTES.ADD_RECIPE}
          element={
            <ProtectedRoute>
              <AddRecipePage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.MEDIAS} element={<MediasListPage />} />
        <Route path={ROUTES.MEDIA} element={<MediaPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route
          path={ROUTES.REGISTER_CONFIRMATION}
          element={<RegisterConfirmation />}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Routes>
  );
}
