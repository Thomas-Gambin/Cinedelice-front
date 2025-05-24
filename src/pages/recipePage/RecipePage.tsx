import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../../@types/index";
import api from "../../utils/api";
import "./recipePage.scss";

export default function RecipePage() {
  const { recipeid } = useParams<{ recipeid: string }>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await api.get(`/recipes/${recipeid}`);
        setRecipe(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette :", error);
      }
    };
    getRecipe();
  }, [recipeid]);

  return (
    <div className="recipe">
      <h1 className="recipe__header">{recipe?.name}</h1>

      <div className="recipe__wrapper">
        <img
          src={recipe?.coverImg || "/recipe-placeholder.jpg"}
          alt=""
          className="recipe__image"
        />

        <div className="recipe__details">
          <div className="recipe__details__author">
            <p>
              Recette créée par :{" "}
              <b style={{ fontWeight: "bold" }}>{recipe?.Author?.username}</b>
            </p>
            <p>
              Inspirée par :{" "}
              <b style={{ fontWeight: "bold" }}>{recipe?.Media?.title}</b>
            </p>
          </div>

          <div className="recipe__details__description">
            <p>Description : {recipe?.description}</p>
          </div>
        </div>
      </div>

      <h2>Ingrédients :</h2>

      <div className="recipe__ingredients">
        <ul>
          {recipe?.Compositions.map((ingredient) => (
            <li key={ingredient.id}>
              <p>
                <b style={{ fontWeight: "bold" }}>
                  {ingredient.quantity} {ingredient.unit}{" "}
                </b>
                de{" "}
                <b style={{ fontWeight: "bold" }}>
                  {ingredient.Ingredient.name}
                </b>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <h2>Préparation :</h2>

      <div className="recipe__steps">
        <ol>
          {recipe?.Steps.map((step) => (
            <li key={step.id}>{step.description}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
