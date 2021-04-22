import React from "react";
import "./Current.css";

function Current(props) {
  console.log(props);
  return (
    <div>
      <div className="currentUser">
        <h2 className="indexCounter">
          {props.index} / {props.listLength}
        </h2>
        <h1 className="userName">
          {props.info.name.first} {props.info.name.last}
        </h1>
        <div className="basicInfo">
          <p>
            <strong>From: </strong> {props.info.city}, {props.info.country}
          </p>
          <p>
            <strong>Job Title: </strong> {props.info.title}
          </p>
          <p>
            <strong>Employer: </strong>
            {props.info.employer}
          </p>
        </div>
        <div className="favMovies">
          <h2>Favorite Movies:</h2>
          <ol>
            {props.info.favoriteMovies.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="centerBtn">
        <button
          className="btn"
          onClick={() => {
            props.deleteInfo(props.index);
          }}
        >
          Delete
        </button>
      </div>
      <br />
      <div className="navBtns">
        <button
          className="navStyle"
          onClick={() => {
            props.previousInfo(props.index);
          }}
        >
          {"<"} Previous
        </button>
        <button
          className="navStyle"
          onClick={() => {
            props.nextInfo(props.index);
          }}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
}

export default Current;
