import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "./sections/Header";
import { User } from "./context/context";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Form(props) {
  const [name, nametransfer] = useState("");
  const [email, emailtransfer] = useState("");
  const [password, passwordtransfer] = useState("");
  const [repassword, repasswordtransfer] = useState("");
  let nav = useNavigate();
  const mycontext = useContext(User);
  var loc = useLocation();

  useEffect(() => {
    nametransfer(props.name);
    emailtransfer(props.email);
  }, [props.name, props.email]);
  const [bool, SetBool] = useState(false);

  async function submitt(e) {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password < 8 ||
      repassword !== password
    ) {
      SetBool(false);
    } else {
      SetBool(true);
    }
    if (bool) {
      try {
        let res = await axios.post(
          `http://127.0.0.1:8000/api/${props.endpoint}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: repassword,
          }
        );

        if (res.status === 200) {
          let tokens = res.data.data.token;
          let userInformation = res.data.data.user;
          const cookie = new Cookies();
          cookie.set("Be", tokens);
          mycontext.SetUser1({ tokens, userInformation });

          nav(props.path);
        }
      } catch (error) {}
    }
  }
  return (
    <>
      <Header />
      <div className="signin-continer">
        <div className="k">
          <form action="" method="post">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              onChange={(e) => {
                nametransfer(e.target.value);
              }}
              value={name || props.name}
              required
            />
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                passwordtransfer(e.target.value);
              }}
              value={password}
              required
            />
            <label htmlFor="repassword">Repeat Password</label>
            <input
              type="password"
              id="repassword"
              placeholder="Repeat Your Password"
              onChange={(e) => {
                repasswordtransfer(e.target.value);
              }}
              value={repassword}
              required
            />
            <p className="error">Please retype your password correctly</p>
            <button type="submit" onClick={submitt}>
              {props.btn}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
