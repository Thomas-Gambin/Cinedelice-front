import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../../components/searchbar/searchbar";
import type { Recipe } from "../../@types/index";
import { Card } from "../../components/card/card";
import api from "../../utils/api";
import "./recipesListPage.scss";
import { ROUTES } from "../../App";

export default function RecipesListPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        console.log("requete API :", {
          name,
          categoryId,
        });

        const { data } = await api.get<Recipe[]>("/recipes", {
          params: {
            name,
            categoryId,
            limit: 50,
          },
        });
        setRecipes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
      }
    };
    getRecipes();
  }, [name, categoryId]);

  return (
    <>
      <SearchBar />
      <div className="recipes-wrapper">
        <h2 className="recipes-title">Liste des recettes</h2>

        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <Link
              // to={`/recipes/${recipe.id}`}
              to={ROUTES.RECIPE.replace(":recipeid", recipe.id.toString())}
              key={recipe.id}
              className="recipe-card-link"
            >
              <Card
                orientation="vertical"
                title={recipe.name}
                img={{
                  src: recipe.coverImg,
                  alt: `Affiche de la recette ${recipe.name}`,
                }}
                description={recipe.description}
                category={recipe.Category?.name}
                type="recipe"
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
