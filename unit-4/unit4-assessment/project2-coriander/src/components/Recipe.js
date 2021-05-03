import { Component } from "react";
import IngredientList from "./IngredientList";
import "../App.css";
import { Modal } from "react-bootstrap";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecipe: false,
    };
  }

  toggleShowRecipe = () => {
    this.props.showRecipe(this.props.recipe.id);
    this.setState({
      showRecipe: !this.state.showRecipe,
    });
  };

  handleCloseRecipe = () => {
    this.toggleShowRecipe();
  };

  render() {
    return this.state.showRecipe ? (
      <div className="openRecipes">
        <Modal
          show={this.state.showRecipe}
          onHide={this.handleCloseRecipe}
          className="modalStyling"
          backdropClassName="Overlay"
          animation={false}
        >
          <Modal.Body>
            <button className="modalCloseBtn" onClick={this.handleCloseRecipe}>
              X
            </button>
            <div className="openImg">
              <img src={this.props.recipe.image} alt={this.props.recipe.name} />

              <h2>{this.props.recipe.name}</h2>
              <p>
                {this.props.recipe.time} minutes | {this.props.recipe.servings}
                servings
              </p>
            </div>
            <IngredientList
              recipe={this.props.recipe}
              editRecipe={this.props.editRecipe}
            />
            <p>{this.props.recipe.instructions}</p>
          </Modal.Body>
        </Modal>
      </div>
    ) : (
      <div className="recipeCard">
        <img
          className="recipeImg"
          src={this.props.recipe.image}
          alt={this.props.recipe.name}
        />
        <h2 className="cardTitle">{this.props.recipe.name}</h2>
        <p className="timeandServe">
          {this.props.recipe.time} minutes | {this.props.recipe.servings}{" "}
          servings
        </p>
        <div className="cardBtns">
          <button
            className={
              this.props.savedRecipes.findIndex(
                (e) => e.id === this.props.recipe.id
              ) === -1
                ? "clickableBtn"
                : "unclickableBtn"
            }
            onClick={() =>
              this.props.addSaveRecipe(
                this.props.recipe.name,
                this.props.recipe.time,
                this.props.recipe.servings,
                this.props.recipe.id
              )
            }
          >
            + Add to list
          </button>
          <button onClick={() => this.toggleShowRecipe()}>
            Show Full Recipe
          </button>
        </div>
      </div>
    );
  }
}

export default Recipe;
