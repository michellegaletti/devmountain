//Require Express
const express = require("express");
const recipeController = require("./controllers/recipeController");

//Create App instance
const app = express();
const PORT = 3333;

//Import controllers
const recipeCtrl = require("./controllers/recipeController");

//Top level middleware
app.use(express.json());

//Endpoints
app.get("/api/allRecipes/", recipeCtrl.getAllRecipes);
app.get("/api/recipes/:id", recipeCtrl.showRecipe);
app.get("/api/resetRecipes/", recipeCtrl.resetRecipes);
app.post("/api/recipes/", recipeCtrl.addSaveRecipe);
app.delete("/api/savedRecipes/:id", recipeCtrl.deleteRecipe);
app.put("/api/recipes/:recipeId", recipeCtrl.editRecipe);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
