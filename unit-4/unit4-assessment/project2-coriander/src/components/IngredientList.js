import { Component } from "react";

class IngredientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      ingredientAmount: props.recipe.ingredients.map(() => ""),
    };
  }

  handleChange = (value, index) => {
    const { ingredientAmount } = this.state;
    ingredientAmount[index] = value;
    this.setState({ ingredientAmount });
  };

  toggleEdit = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  handleSave = () => {
    this.props.editRecipe(this.props.recipe.id, this.state.ingredientAmount);
    this.toggleEdit();
    this.setState({
      ingredientAmount: this.props.recipe.ingredients.map(() => ""),
    });
  };

  render() {
    return this.state.editMode ? (
      <div>
        <div>
          <ul>
            {this.props.recipe.ingredients.map((ingredient, index) => (
              <div key={index}>
                <li>
                  <input
                    className="ingAmountInput"
                    placeholder={ingredient.amount}
                    value={this.state.ingredientAmount[index].amount}
                    onChange={(e) => this.handleChange(e.target.value, index)}
                  />
                  {ingredient.unit} {ingredient.name}
                </li>
              </div>
            ))}
          </ul>
          <button onClick={this.handleSave}>Save</button>
        </div>
      </div>
    ) : (
      <div>
        <div>
          <button onClick={() => this.toggleEdit()}>Edit</button>
          <ul>
            {this.props.recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default IngredientList;
