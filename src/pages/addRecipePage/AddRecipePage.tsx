import { type ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { CreateRecipeSchema } from "../../validators/recipesValidator";
import "./addRecipePage.scss";

interface Category {
  id: string;
  name: string;
}

interface Media {
  id: string;
  title: string;
}

interface Ingredient {
  id: string;
  name: string;
}

interface RecipeData {
  name: string;
  description: string;
  categoryId: string;
  mediaId: string;
  coverImg: File | null;
}

interface RecipeIngredient {
  ingredientId: string;
  quantity: string;
  unit: string;
}

interface Step {
  description: string;
}

export default function AddRecipePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [recipeData, setRecipeData] = useState<RecipeData>({
    name: "",
    description: "",
    categoryId: "",
    mediaId: "",
    coverImg: null,
  });

  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([{ ingredientId: "", quantity: "", unit: "" }]);

  const [steps, setSteps] = useState<Step[]>([{ description: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, mediasResponse, ingredientsResponse] =
          await Promise.all([
            api.get("/categories"),
            api.get("/medias"),
            api.get("/ingredients"),
          ]);

        setCategories(categoriesResponse.data);
        setMedias(mediasResponse.data);
        setIngredients(ingredientsResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setRecipeIngredients((prev) =>
      prev.map((ing, idx) => (idx === index ? { ...ing, [name]: value } : ing)),
    );
  };

  const addIngredient = () => {
    setRecipeIngredients((prev) => [
      ...prev,
      { ingredientId: "", quantity: "", unit: "" },
    ]);
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleStepChange = (
    index: number,
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setSteps((prev) =>
      prev.map((step, idx) => (idx === index ? { description: value } : step)),
    );
  };

  const addStep = () => {
    setSteps((prev) => [...prev, { description: "" }]);
  };

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setRecipeData((prev) => ({ ...prev, coverImg: file }));
  };

  const uploadCoverImage = async (recipeId: string, image: File) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(image?.type)) {
      toast.error(
        "L'image de couverture n'a pas pu être téléchargée. Veuillez choisir un fichier au format JPEG, PNG ou WEBP.",
        { autoClose: 2000 },
      );
      return;
    }

    const formData = new FormData();
    formData.append("coverImg", image);

    try {
      await api.put(`/recipes/${recipeId}/coverImg`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      alert("Erreur lors de l'upload de l'image de couverture.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipeDetails = {
      name: recipeData.name,
      description: recipeData.description,
      authorId: user?.id,
      mediaId: recipeData.mediaId,
      categoryId: recipeData.categoryId,
      composition: recipeIngredients,
      steps: steps.map((step) => ({ description: step.description })),
    };

    const validationResult = CreateRecipeSchema.validate(recipeDetails, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (validationResult.error) {
      const errorObj: Record<string, string> = {};
      for (const detail of validationResult.error.details) {
        const path = detail.path.join(".");
        errorObj[path] = detail.message;
      }

      setErrors(errorObj);
      return;
    }

    setErrors({});
    const toastId = toast.loading("Création de la recette...");

    try {
      const { data } = await api.post("/recipes", recipeDetails);
      await uploadCoverImage(data.id, recipeData.coverImg as File);

      toast.update(toastId, {
        render: "Recette créée avec succès !",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate(`/recipes/${data.id}`);
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "Erreur lors de la création de la recette.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="create-recipe">
      <h1 className="create-recipe__title">Créer une nouvelle recette</h1>

      <form className="create-recipe__form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2 className="form-section__title">Informations générales</h2>

          <div className="form-group">
            <label htmlFor="name">Nom de la recette *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipeData.name}
              onChange={handleChange}
              placeholder="Ex: Ratatouille provençale"
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={recipeData.description}
              onChange={handleChange}
              placeholder="Décrivez votre recette en quelques phrases..."
              required
              rows={4}
            />
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoryId">Catégorie *</label>
              <select
                id="categoryId"
                name="categoryId"
                value={recipeData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <div className="error-message">{errors.categoryId}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mediaId">Média d'inspiration *</label>
              <select
                id="mediaId"
                name="mediaId"
                value={recipeData.mediaId}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un média</option>
                {medias.map((media) => (
                  <option key={media.id} value={media.id}>
                    {media.title}
                  </option>
                ))}
              </select>
              {errors.mediaId && (
                <div className="error-message">{errors.mediaId}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coverImg">Image de couverture</label>
            <input
              type="file"
              id="coverImg"
              name="coverImg"
              onChange={handleImageUpload}
              accept="image/*"
              className="file-input"
            />
            {recipeData.coverImg && (
              <div className="image-preview">
                <img
                  src={
                    recipeData.coverImg
                      ? URL.createObjectURL(recipeData.coverImg)
                      : ""
                  }
                  alt="Aperçu de l'image"
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2 className="form-section__title">Ingrédients</h2>

          {recipeIngredients.map((ingredient, index) => (
            <div
              key={ingredient.ingredientId || index}
              className="ingredient-row"
            >
              <div className="form-group">
                <label htmlFor={`ingredient-${index}`}>Ingrédient *</label>
                <select
                  id={`ingredient-${index}`}
                  name="ingredientId"
                  value={ingredient.ingredientId}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                >
                  <option value="">Sélectionnez un ingrédient</option>
                  {ingredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  ))}
                </select>
                {errors[`composition.${index}.ingredientId`] && (
                  <div className="error-message">
                    {errors[`composition.${index}.ingredientId`]}
                  </div>
                )}
              </div>

              <div className="form-group quantity-group">
                <label htmlFor={`quantity-${index}`}>Quantité *</label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Ex: 100"
                  required
                  min="0"
                  step="any"
                />
                {errors[`composition.${index}.quantity`] && (
                  <div className="error-message">
                    {errors[`composition.${index}.quantity`]}
                  </div>
                )}
              </div>

              <div className="form-group unit-group">
                <label htmlFor={`unit-${index}`}>Unité *</label>
                <input
                  type="text"
                  id={`unit-${index}`}
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Ex: g"
                  required
                />
                {errors[`composition.${index}.unit`] && (
                  <div className="error-message">
                    {errors[`composition.${index}.unit`]}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeIngredient(index)}
                disabled={recipeIngredients.length <= 1}
              >
                &times;
              </button>
            </div>
          ))}

          <button type="button" className="add-btn" onClick={addIngredient}>
            + Ajouter un ingrédient
          </button>
        </div>

        <div className="form-section">
          <h2 className="form-section__title">Étapes de préparation</h2>

          {steps.map((step, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="step-row">
              <div className="form-group step-group">
                <label htmlFor={`step-${index}`}>Description *</label>
                <textarea
                  id={`step-${index}`}
                  value={step.description}
                  onChange={(e) => handleStepChange(index, e)}
                  placeholder="Décrivez cette étape..."
                  required
                  rows={2}
                />
                {errors[`steps.${index}.description`] && (
                  <div className="error-message">
                    {errors[`steps.${index}.description`]}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeStep(index)}
                disabled={steps.length <= 1}
              >
                &times;
              </button>
            </div>
          ))}

          <button type="button" className="add-btn" onClick={addStep}>
            + Ajouter une étape
          </button>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          <button type="submit" className="submit-btn">
            Créer la recette
          </button>
        </div>
      </form>
    </div>
  );
}
