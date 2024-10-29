import React, { useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  database,
  getRedirectResult,
  provider,
  ref,
  set,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "./firebaseConfig";
import Loader from "./Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setErr("");
    setLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        setEmail("");
        setPass("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignup = () => {
    setErr("");
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, "users/" + user.uid), {
          name: user.displayName,
          email: user.email,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      })
      .finally(() => {
        setEmail("");
        setPass("");
        setLoading(false);
      });
  };

  const handleGoogle = () => {
    setErr("");
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        set(ref(database, "users/" + user.uid), {
          name: user.displayName,
          email: user.email,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login">
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {err && <div className="error">{err}</div>}
      <form>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="login-btns">
          <button type="button" onClick={handleLogin}>
            Log in
          </button>
          <button type="button" onClick={handleSignup}>
            Sign up
          </button>
        </div>
        <button type="button" className="google-btn" onClick={handleGoogle}>
          Google
        </button>
      </form>
    </div>
  );
};

export default Login;
