import RecipeList from "./components/RecipeList";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <RecipeList />
      </div>
    </div>
  );
}

export default App;
