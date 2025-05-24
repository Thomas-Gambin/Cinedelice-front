import Joi from "joi";

const CreateRecipeSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 100 characters long",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(10).max(5000).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description must be at most 5000 characters long",
    "any.required": "Description is required",
  }),
  authorId: Joi.number().integer().positive().required().messages({
    "number.base": "Author ID must be a number",
    "number.integer": "Author ID must be an integer",
    "number.positive": "Author ID must be a positive number",
    "any.required": "Author ID is required",
  }),
  mediaId: Joi.number().integer().positive().required().messages({
    "number.base": "Media ID must be a number",
    "number.integer": "Media ID must be an integer",
    "number.positive": "Media ID must be a positive number",
    "any.required": "Media ID is required",
  }),
  categoryId: Joi.number().integer().positive().required().messages({
    "number.base": "Category ID must be a number",
    "number.integer": "Category ID must be an integer",
    "number.positive": "Category ID must be a positive number",
    "any.required": "Category ID is required",
  }),
  composition: Joi.array()
    .items(
      Joi.object({
        ingredientId: Joi.number().integer().positive().required().messages({
          "number.base": "Ingredient ID must be a number",
          "number.integer": "Ingredient ID must be an integer",
          "number.positive": "Ingredient ID must be a positive number",
          "any.required": "Ingredient ID is required",
        }),
        quantity: Joi.number().positive().required().messages({
          "number.base": "Quantity must be a number",
          "number.positive": "Quantity must be a positive number",
          "any.required": "Quantity is required",
        }),
        unit: Joi.string().required().messages({
          "string.base": "Unit must be a string",
          "string.empty": "Unit is required",
          "any.required": "Unit is required",
        }),
      }),
    )
    .required()
    .messages({
      "array.base": "Composition must be an array",
      "array.includesRequiredUnknowns": "Composition must include valid items",
      "any.required": "Composition is required",
    }),
  steps: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().min(5).max(500).required().messages({
          "string.base": "Step description must be a string",
          "string.empty": "Step description is required",
          "string.min": "Step description must be at least 5 characters long",
          "string.max": "Step description must be at most 500 characters long",
          "any.required": "Step description is required",
        }),
      }),
    )
    .required()
    .messages({
      "array.base": "Steps must be an array",
      "array.includesRequiredUnknowns": "Steps must include valid items",
      "any.required": "Steps are required",
    }),
});

export { CreateRecipeSchema };
