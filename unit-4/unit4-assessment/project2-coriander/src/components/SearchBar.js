import React, { Component } from "react";
import "../App.css";

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      userInput: "",
    };
  }

  handleChange = (event) => {
    this.setState({ userInput: event });
  };

  handleClick = () => {
    this.props.filterRecipes(this.state.userInput);
  };

  handleClear() {
    this.setState({ userInput: "" });
    this.props.reset();
  }

  render() {
    return (
      <div className="search">
        <input
          className="searchInput"
          placeholder="Search recipes..."
          value={this.state.userInput}
          type="text"
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <button onClick={() => this.handleClick()}>Search</button>
        {this.state.userInput.length > 0 && (
          <button onClick={() => this.handleClear()}>Clear Search</button>
        )}
      </div>
    );
  }
}

export default SearchBar;
