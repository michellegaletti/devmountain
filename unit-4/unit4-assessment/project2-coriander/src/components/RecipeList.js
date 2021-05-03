import { Component } from "react";
import axios from "axios";
import SavedRecipes from "./SavedRecipes";
import Recipe from "./Recipe";
import SearchBar from "./SearchBar";
import "../App.css";

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      recipeObj: null,
      allRecipes: [],
      savedRecipesList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getAllRecipes();
  }

  getAllRecipes = () => {
    axios
      .get("/api/allRecipes/")
      .then((response) => {
        this.setState({ allRecipes: response.data, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  resetRecipes = () => {
    axios
      .get("/api/resetRecipes/")
      .then((response) => {
        this.setState({ allRecipes: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showRecipe = (id) => {
    axios
      .get(`/api/recipes/${id}`)
      .then((res) => {
        this.setState({ recipeObj: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteRecipe = (id) => {
    axios
      .delete(`/api/savedRecipes/${id}`)
      .then((response) => {
        this.setState({ savedRecipesList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addSaveRecipe = (title, time, servings, id) => {
    axios
      .post(`/api/recipes/`, {
        title,
        time,
        servings,
        id,
      })
      .then((response) =>
        this.setState({
          savedRecipesList: response.data,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  editRecipe = (id, amountArr) => {
    axios
      .put(`/api/recipes/${id}`, { amountArr })
      .then((response) => {
        this.setState({ allRecipes: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  filterRecipes = (input) => {
    let filteredRecipes = this.state.allRecipes.filter(function (element) {
      return element.name.toLowerCase().includes(input);
    });

    this.setState({ allRecipes: filteredRecipes });
  };

  reset = () => {
    this.resetRecipes();
  };

  render() {
    return this.state.isLoading ? (
      <div className="loadingPage">
        <h2>Loading...</h2>
      </div>
    ) : (
      <div>
        <div className="recipeContent">
          <SavedRecipes
            className="savedRecipes"
            savedRecipesList={this.state.savedRecipesList}
            deleteRecipe={this.deleteRecipe}
          />
          <div className="searchBar">
            <SearchBar filterRecipes={this.filterRecipes} reset={this.reset} />
          </div>
          <div className="recipeListDisplay">
            {this.state.allRecipes.map((recipe, index) => {
              return (
                <div key={index}>
                  <Recipe
                    className="recipesDisplayed"
                    recipe={recipe}
                    showRecipe={this.showRecipe}
                    addSaveRecipe={this.addSaveRecipe}
                    editRecipe={this.editRecipe}
                    savedRecipes={this.state.savedRecipesList}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeList;
