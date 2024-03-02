import { useContext, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Header from "../sections/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../context/context";
export default function Login() {
  let mycontext = useContext(User);
  let location = useLocation();
  let from = location.state?.from?.pathName || "/";

  let nav = useNavigate();
  const [email, emailtransfer] = useState("");

  const [password, passwordtransfer] = useState("");
  let bool = true;
  let first = true;
  function validPass(password) {
    if (
      first === false &&
      !(
        password.match(/[A-Z]+/) &&
        password.match(/[a-z]+/) &&
        password.match(/\d+/) &&
        password.length > 8
      )
    ) {
      document.querySelector("#unAuthPass").style.display = "block";
      return false;
    } else {
      document.querySelector("#unAuthPass").style.display = "none";
    }
    return true;
  }
  async function submitt(e) {
    e.preventDefault();
    first = false;
    (await validPass(password)) ? (bool = true) : (bool = false);
    if (email === "" || password === "") {
      bool = false;
      document.getElementById("null").style.display = "block";
    } else {
      document.getElementById("null").style.display = "none";
    }

    if (bool) {
      try {
        let res = await axios.post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
        });
        if (res.status === 200) {
          let tokens = res.data.data.token;
          let userInformation = res.data.data.user.email;
          const cookie = new Cookies();
          cookie.set("Be", tokens);
          if (userInformation == "ode@gmail.com") {
            cookie.set("role", "100");
          } else {
            cookie.set("role", "99");
          }

          mycontext.SetUser1({ tokens, userInformation });
          nav(from, { state: { from: location } });
        }
      } catch (error) {
        if (error.response.status) {
          let error = document.querySelector("#unAuth");
          error.style.display = "block";
        }
      }
    }
  }
  return (
    <>
      <Header />
      <div className="signin-continer">
        <div className="k" style={{ height: "410px" }}>
          <form action="" method="post" style={{ height: "400px" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              onChange={(e) => {
                emailtransfer(e.target.value);
              }}
              value={email}
              required
            />
            <label htmlFor="password" style={{ marginTop: "20px" }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                passwordtransfer(e.target.value);
                validPass(e.target.value);
              }}
              value={password}
              required
            />
            <p className="error" id="unAuth">
              Please retype your password and email correctly
            </p>
            <p className="error" id="unAuthPass">
              password must be more than 8 characters and have capital and small
              letters and numbers
            </p>
            <p className="error" id="null">
              please fill every field
            </p>

            <button
              type="submit"
              onClick={(e) => {
                submitt(e);
              }}
              style={{ marginTop: "20px" }}
            >
              Login
            </button>
          </form>
          :
        </div>
      </div>
    </>
  );
}
