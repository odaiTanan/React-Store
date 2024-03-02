import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "../context/context";
import Cookies from "universal-cookie";
import Cart from "./Cart";
import { Data } from "../context/DataCartContext";

export default function Header() {
  let location = useLocation();

  const [Show, setShow] = useState(true);
  function visible() {
    setShow(!Show);

    if (Show) {
      document.querySelector("#cartcontiner").style.display = "flex";
    } else {
      document.querySelector("#cartcontiner").style.display = "none";
    }
  }
  function logout() {
    let cookie = new Cookies();
    cookie.remove("Be");
    cookie.remove("role");
    cookie.remove("buyed");
    window.location.pathname = "/Login";
  }
  let user = useContext(User);
  let cookie = new Cookies();
  let role = cookie.get("role");

  return (
    <header>
      <div className="first-div">
        <Link to="/">Home</Link>

        <Link to="/TheProducts">Products</Link>
      </div>
      {!user.User1 ? (
        <div className="second-div">
          <Link to="/Login">Login</Link>
          <Link to="/Register">Register</Link>
        </div>
      ) : (
        <div
          className="headbuttons"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <div className="logout" onClick={logout}>
              Log out
            </div>
            {role == 100 && (
              <Link className="logout" to="/Dashboard">
                Dashboard
              </Link>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <i
              className="fa-solid fa-cart-shopping logout "
              style={{
                textAlign: "center",
                backgroundColor: " rgb(40, 39, 39)",
                color: "chartreuse",
                fontSize: "20px",
                width: "50px",
              }}
              onClick={() => {
                visible();
              }}
            ></i>
          </div>
          <Cart />
        </div>
      )}
    </header>
  );
}
