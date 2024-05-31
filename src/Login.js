import axios from "axios";
import { apiLink } from "./constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLogin } from "./atoms";
import { useAtom } from "jotai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useAtom(isLogin);
  const navigate = useNavigate();
  function register() {
    axios
      .post(`${apiLink}users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message == "Login successful!") {
          setLogin(true);
          localStorage.setItem("session", res.data.token);
          navigate("/account");
        }
      });
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="login-form">
        <label>
          Email:{" "}
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          Password:{" "}
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button onClick={(e) => register()}>Register Now!</button>
      </div>
      <p>
        Don't have an account?
        <a href="/signup">Sign up now!</a>
      </p>
    </div>
  );
}

export default Login;
