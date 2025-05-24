import "./searchbar.scss";
import classnames from "classnames";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchBar = ({
  className,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isMediaPage = location.pathname === "/medias";

  const placeholderText = isMediaPage
    ? "Rechercher un film ou une série..."
    : "Rechercher une recette...";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const url = isMediaPage
      ? `/medias?title=${encodeURIComponent(search)}`
      : `/recipes?name=${encodeURIComponent(search)}`;
    navigate(url);
  };

  return (
    <section className={classnames("search", className)}>
      <h1>Découvrez les recettes inspirées de vos films et séries préférés</h1>
      <input
        type="text"
        placeholder={placeholderText}
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </section>
  );
};
