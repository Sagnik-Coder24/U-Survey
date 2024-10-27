import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Usurvey from "./Components/Usurvey";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <div className="logo">
          <img src={reactLogo} className="logo-img" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <Usurvey />
    </>
  );
}

export default App;
