import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Recipe } from "../../@types";
import api from "../../utils/api";
import { SearchBar } from "../../components/searchbar/searchbar";
import { Categories } from "../../components/categories/categories";
import { Card } from "../../components/card/card";
import { ROUTES } from "../../App";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await api.get<Recipe[]>("/recipes?limit=4");
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const getRandomRecipes = async () => {
      try {
        const { data } = await api.get<Recipe[]>(
          "/recipes?random=true&limit=4",
        );
        setRandomRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    getRecipes();
    getRandomRecipes();
  }, []);

  return (
    <>
      <SearchBar />

      <div className="wrapper">
        <section className="left">
          <Categories />

          <div className="recent-recipes">
            <h3>Les recettes les plus récentes</h3>
            <div className="grid">
              {recipes.map((recipe) => (
                <Link
                  // to={`/recette/${recipe.id}`}
                  to={ROUTES.RECIPE.replace(":recipeid", recipe.id.toString())}
                  className="recipe-card-link"
                  key={recipe.id}
                >
                  <Card
                    title={recipe.name}
                    img={{
                      src: recipe.coverImg,
                      alt: recipe.name,
                    }}
                    description={recipe.description}
                    category={recipe.Category?.name}
                    orientation="vertical"
                    type="recipe"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="right">
          <h2>Trouvez votre inspiration</h2>
          <div className="inspiration-cards">
            {randomRecipes.map((recipe) => (
              <Link
                // to={`/recette/${recipe.id}`}
                to={ROUTES.RECIPE.replace(":recipeid", recipe.id.toString())}
                className="inspiration-card-link"
                key={recipe.id}
              >
                <Card
                  title={recipe.name}
                  img={{
                    src: recipe.coverImg,
                    alt: recipe.name,
                  }}
                  description={recipe.description}
                  category={recipe.Category?.name}
                  orientation="horizontal"
                  type="recipe"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
