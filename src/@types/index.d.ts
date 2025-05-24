export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  verfication_code: string;
  role: string;
};

export type Recipe = {
  id: number;
  name: string;
  coverImg: string;
  description: string;
  mediaId: number;
  actif: boolean;

  createdAt: string;
  updatedAt: string;

  authorId: number;
  categoryId: number;
  Author: User;
  Compositions: Composition[];
  Media: Media;
  Steps: Step[];
  Category: Category;
};

export type Step = {
  id: number;
  description: string;
  recipe_id: number;
};

export type Media = {
  id: number;
  title: string;
  coverImage: string;
  anecdote: string;
  createdAt: string;
  updatedAt: string;
  Recipes: Recipe[];
};

export type Ingredient = {
  id: number;
  name: string;
};

export type Composition = {
  id: number;
  recipe_id: number;
  ingredientId: number;
  quantity: number;
  unit: string;
  Ingredient: Ingredient;
};

export type Category = {
  id: number;
  name: string;
};
