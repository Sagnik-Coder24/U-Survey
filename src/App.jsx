import reactLogo from "./assets/react.svg";
import "./App.css";
import Usurvey from "./Components/Usurvey";
import Login from "./Components/Login";
import { auth, onAuthStateChanged, signOut } from "./Components/firebaseConfig";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader/Loader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <header>
        <div className="logo">
          <img src={reactLogo} className="logo-img" alt="Logo" />
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Services</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            {isLoggedIn && (
              <li>
                <a className="signout" onClick={handleSignout}>
                  Sign out
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>{isLoggedIn ? <Usurvey user={auth.currentUser} /> : <Login />}</>
      )}
    </>
  );
}

export default App;

// FB BD rules
