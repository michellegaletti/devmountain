import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientAmount: "",
    };
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({ ingredientAmount: value });
  };

  render() {
    return (
      <li>
        <input
          placeholder={this.props.ingredient.amount}
          value={this.state.ingredientAmount}
          onChange={(e) => this.handleChange(e.target.value)}
        />
        {this.props.ingredient.unit} {this.props.ingredient.name}
      </li>
    );
  }
}

export default Form;
