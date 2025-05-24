import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../../components/searchbar/searchbar";
import type { Media } from "../../@types/index";
import { Card } from "../../components/card/card";
import "./mediasListPage.scss";
import api from "../../utils/api";

export default function MediasListPage() {
  const [medias, setMedias] = useState<Media[]>([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title") || "";

  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await api.get<Media[]>("/medias", {
          params: {
            title,
          },
        });
        setMedias(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du média :", error);
      }
    };
    getMedia();
  }, [title]);

  return (
    <>
      <SearchBar />
      <div className="medias-wrapper">
        <div className="medias-title">
          <h1>Liste des films et séries</h1>
        </div>
        <div className="medias-grid">
          {medias.map((media) => (
            <Link
              to={`/media/${media.id}`}
              key={media.id}
              className="media-card-link"
            >
              <Card
                orientation="vertical"
                type="media"
                title={media.title}
                img={{
                  src: media.coverImage,
                  alt: `Affiche du média ${media.title}`,
                }}
                description={media.anecdote}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
