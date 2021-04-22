// import React, { Component } from "react";
// import "./App.css";
// import data from "./data";
// import Current from "./Current";
// // import router from "./router";
// // import { Link } from "react-router-dom";

// export default class App extends Component {

//   render() {
//     let dataList = data;
//     console.log(dataList[0].name);
//     return (
//       <div className="app">
//         <h1> Name: {dataList[0].name.first}</h1>
//         {dataList[0].name.first}
//       </div>
//     );
//   }
// }

import "./App.css";
import DataList from "./components/DataList";

function App() {
  return (
    <div className="app">
      <DataList />
    </div>
  );
}

export default App;
