import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { Media } from "../../@types/index";
import { ROUTES } from "../../App";
import { Card } from "../../components/card/card";
import api from "../../utils/api";
import "./mediaPage.scss";

export default function MediaPage() {
  const { mediaid } = useParams<{ mediaid: string }>();
  const [media, setMedia] = useState<Media | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await api.get(`/medias/${mediaid}/recipes`);
        setMedia(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du média :", error);
      }
    };
    getMedia();
  }, [mediaid]);

  return (
    <div className="media__wrapper">
      <h1 className="header">{media?.title}</h1>

      <div className="details">
        <img
          className="details__img"
          src={media?.coverImage}
          alt={media?.title}
        />

        <div>
          <div className="details__title">{media?.title}</div>
          <div className="details__anecdote">{media?.anecdote}</div>
        </div>
      </div>

      <div className="recipes">
        <h2>Recettes associées</h2>

        <div className="recipes__cards">
          {media?.Recipes.map((recipe) => (
            <Link
              to={ROUTES.RECIPE.replace(":recipeid", recipe.id.toString())}
              key={recipe.id}
            >
              <Card
                title={recipe.name}
                img={{
                  alt: recipe.name,
                  src: recipe.coverImg,
                }}
                orientation="horizontal"
                description={recipe.description}
                type="recipe"
                category={recipe.Category?.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
