import "../App.css";

function Instructions(props) {
  return (
    <div>
      <p>{props.recipe.instructions}</p>
    </div>
  );
}

export default Instructions;
