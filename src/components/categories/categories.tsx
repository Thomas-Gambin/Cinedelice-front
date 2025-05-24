import { useEffect, useState } from "react";
import "../button/button.scss";
import type { Category } from "../../@types";
import "./categories.scss";
import api from "../../utils/api";
import { Link } from "react-router-dom";

export const Categories = () => {
  const [recipeCategories, setRecipeCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getRecipeCategory = async () => {
      try {
        const { data } = await api.get<Category[]>("/categories");
        setRecipeCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getRecipeCategory();
  }, []);

  return (
    <div>
      <h2>Catégories</h2>
      <div className="categories__container">
        {recipeCategories.map((category) => (
          <Link
            to={`/recipes?categoryId=${category.id}`}
            key={category.id}
            className="category--btn"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
