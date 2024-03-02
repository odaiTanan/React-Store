import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { User } from "../context/context";
import { useLocation, useNavigate } from "react-router-dom";
export default function UpdateUser() {
  let id = window.location.pathname.split("/").slice(-1)[0];
  //useParam().
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        nametransfer(data[0].name);
        emailtransfer(data[0].email);
      });
  }, []);
  let first = true;

  const [name, nametransfer] = useState("");
  const [email, emailtransfer] = useState("");
  const [password, passwordtransfer] = useState("");
  const [repassword, repasswordtransfer] = useState("");
  let nav = useNavigate();
  const mycontext = useContext(User);
  var loc = useLocation();
  let token = mycontext.User1.tokens;
  let bool = true;
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
    if (repassword !== password) {
      bool = false;
      document.getElementById("notMatchPass").style.display = "block";
    } else {
      document.getElementById("notMatchPass").style.display = "none";
    }

    if (bool) {
      try {
        let res = await axios.post(
          `http://127.0.0.1:8000/api/user/update/${id}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: repassword,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        nav("/Dashboard/users");
      } catch (error) {
        if (error.response.status === 422) {
          document.querySelector("#notMatchUser").style.display = "block";
        } else {
          document.querySelector("#notMatchUser").style.display = "none";
        }
      }
    }
  }
  return (
    <>
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
              value={name}
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
                validPass(e.target.value);
              }}
              value={password}
              required
            />
            <p className="error" id="unAuthPass">
              password must be more than 8 characters and have capital and small
              letters and numbers
            </p>

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
            <p className="error" id="notMatchPass">
              Please retype your password correctly
            </p>
            <p className="error" id="notMatchUser">
              User is already exist
            </p>

            <button type="submit" onClick={submitt}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
