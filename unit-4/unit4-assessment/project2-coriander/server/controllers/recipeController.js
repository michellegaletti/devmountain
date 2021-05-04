const axios = require("axios");

let allRecipes = [];
let recipeIds = [
  "5790",
  "4754",
  "6239",
  "6987",
  "324684",
  "324430",
  "224520",
  "98453",
  "324526",
  "223500",
  "223300",
  "324694",
];
let savedRecipes = [];

module.exports = {
  getAllRecipes: (req, res) => {
    const newRecipeArr = [];
    for (let i = 0; i < recipeIds.length; i++) {
      const recipe = axios.get(
        `https://api.spoonacular.com/recipes/${recipeIds[i]}/information?includeNutrition=false&apiKey=eb5e9d7f790c4a4693bffe5800d11059`
      );
      newRecipeArr.push(recipe);
    }
    allRecipes = Promise.all([...newRecipeArr]).then((value) => {
      const newAllRecipes = [];
      for (let i = 0; i < value.length; i++) {
        const newRecipe = {
          id: recipeIds[i],
          name: value[i].data.title,
          time: value[i].data.readyInMinutes,
          servings: value[i].data.servings,
          image: value[i].data.image,
          ingredients: value[i].data.extendedIngredients.map((ingredient) => {
            const ing = {
              name: ingredient.name,
              amount: ingredient.amount,
              unit: ingredient.unit,
            };
            return ing;
          }),
          instructions: value[i].data.instructions,
        };
        newAllRecipes.push(newRecipe);
      }
      allRecipes = newAllRecipes;
      res.status(200).send(allRecipes);
    });
  },
  resetRecipes: (req, res) => {
    res.status(200).send(allRecipes);
  },
  showRecipe: (req, res) => {
    const { id } = req.params;
    const index = allRecipes.findIndex((e) => {
      return e.id === id;
    });
    if (index === -1) {
      return res.status(500).send("Recipe not found");
    }
    res.status(200).send(allRecipes[index]);
  },
  addSaveRecipe: (req, res) => {
    const { title, time, servings, id } = req.body;
    const recipe = {
      title,
      time,
      servings,
      id,
    };
    savedRecipes.push(recipe);
    res.status(200).send(savedRecipes);
  },
  deleteRecipe: (req, res) => {
    const { id } = req.params;
    const index = savedRecipes.findIndex((e) => {
      return e.id === id;
    });
    savedRecipes.splice(index, 1);
    res.status(200).send(savedRecipes);
  },
  editRecipe: (req, res) => {
    const { recipeId } = req.params;
    const { amountArr } = req.body;
    const index = allRecipes.findIndex((e) => {
      return e.id === recipeId;
    });
    const tempIng = allRecipes[index].ingredients.map((ingredient, index) => {
      ingredient.amount = amountArr[index]
        ? amountArr[index]
        : ingredient.amount;
      return ingredient;
    });
    allRecipes[index] = {
      ...allRecipes[index],
      ingredients: tempIng,
    };
    res.status(200).send(allRecipes);
  },
};
