import React from "react";

function Answers(props) {
  const display = Object.entries(props.answers).map(([key, value]) => {
    return (
      <div className="answer-item" key={key}>
        <strong>{key}</strong>
        <span>{value}</span>
      </div>
    );
  });

  return (
    <div className={props.active ? "answers-container" : "invisible"}>
      <div>
        <h2>Name</h2>
        <h2 className="name">{props.name}</h2>
      </div>
      {display}
    </div>
  );
}

export default Answers;
