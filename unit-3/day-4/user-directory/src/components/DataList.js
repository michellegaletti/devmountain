import React, { Component } from "react";
import data from "../data";
import Current from "./Current";

class DataList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: data,
      index: 0,
    };
  }

  deleteInfo = (index) => {
    let { info } = this.state;
    info.splice(index, 1);
    this.setState({ info: info });
  };

  nextInfo = (nextIndex) => {
    nextIndex = nextIndex + 1;
    this.setState({ index: nextIndex });
  };

  previousInfo = (prevIndex) => {
    if (this.state.index === 0) {
      prevIndex = 0;
    } else {
      prevIndex = prevIndex - 1;
    }
    this.setState({ index: prevIndex });
  };

  render() {
    return (
      <div>
        <h2 className="header">Home</h2>
        <Current
          info={this.state.info[this.state.index]}
          deleteInfo={this.deleteInfo}
          nextInfo={this.nextInfo}
          previousInfo={this.previousInfo}
          index={this.state.index}
          listLength={this.state.info.length}
        />
      </div>
    );
  }
}

export default DataList;
