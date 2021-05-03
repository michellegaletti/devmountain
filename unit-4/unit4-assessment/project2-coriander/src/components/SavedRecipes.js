import React from "react";

function SavedRecipes(props) {
  let mappedRecipes = props.savedRecipesList.map((recipe, index) => {
    return (
      <div key={index}>
        <h3>{recipe.title} </h3>
        <p>
          {recipe.time} minutes | {recipe.servings} servings
        </p>
        <button
          className="deleteBtn"
          onClick={() => props.deleteRecipe(recipe.id)}
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <div className="savedRecipes">
      <div className="asideArea">
        <h2>Saved Recipes</h2>
      </div>
      <div className="mapRecipes">
        {mappedRecipes.length > 0
          ? mappedRecipes
          : "Click a recipe to save it to your saved recipes"}
      </div>
    </div>
  );
}

export default SavedRecipes;
