import axios from "axios";
import { apiLink } from "./constants";
import { useState } from "react";
import { isLogin } from "./atoms";
import { useAtom } from "jotai";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [login, setLogin] = useAtom(isLogin);

  function register() {
    axios
      .post(`${apiLink}users/register`, {
        firstname:firstname,
        lastname:lastname,
        email: email,
        password: password,
      })
      .then((res) =>{
        if (res.data.message == "Registration successful") {
            localStorage.setItem('session', res.data.token)
            setLogin(true);
          }
      });
  }
  return (
    <div className="login">
      <h2>SignUp</h2>
      <div className="login-form">
        <label>
          First Name:(Optional){" "}
          <input
            className="input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          ></input>
        </label>
        <label>
          Last Name:(Optional){" "}
          <input
            className="input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          ></input>
        </label>
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
    </div>
  );
}

export default Signup;
