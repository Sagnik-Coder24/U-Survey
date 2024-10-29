import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="outer">
      <ul>
        <li>
          <div className="loader">
            <div className="child"></div>
          </div>
        </li>

        <li>
          <div className="text"></div>
        </li>
      </ul>
    </div>
  );
};

export default Loader;
