import { useState } from "react";
import { NavLink } from "react-router-dom";
import Users from "../users/Users";

export default function SideBar() {
  const [side, setSide] = useState(true);
  function sideSow(e) {
    setSide(!side);
    if (side) {
      document.querySelector("#arrow").style.transform = "rotate(180deg) ";
      document.querySelector(".sideBar").style.left = "-305px";
      document.querySelector(".arrow").style.left = "0";
    } else {
      document.querySelector("#arrow").style.transform = "rotate(360deg) ";
      document.querySelector(".sideBar").style.left = "0%";
      document.querySelector(".arrow").style.left = "305px";
    }
  }
  return (
    <div className="SideCon" style={{ position: "relative" }}>
      <div className="arrow" onClick={sideSow}>
        <i className="fa-solid fa-arrow-right" id="arrow"></i>
      </div>
      <div className="sideBar">
        <NavLink to="users">
          <i className="fa-solid fa-user" style={{ marginRight: "10px" }}></i>{" "}
          Users
        </NavLink>
        <NavLink to="user/create">
          <i
            className="fa-solid fa-user-plus"
            style={{ marginRight: "10px" }}
          ></i>
          Add User
        </NavLink>
        <NavLink to="products">
          <i className="fas fa-dice-d6" style={{ marginRight: "10px" }}></i>
          Products
        </NavLink>
        <NavLink to="product/create">
          <i className="fa fa-plus" style={{ marginRight: "10px" }}></i>
          Add Product
        </NavLink>
      </div>
    </div>
  );
}
