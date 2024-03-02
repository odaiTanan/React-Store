import axios from "axios";
import Register from "./auth/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Cookies from "universal-cookie";
import Home from "./sections/Home";
import Users from "./users/Users";
import Dashboard from "./dashboard/Dashboard";
import UpdateUser from "./users/UpdateUser";
import AddUser from "./users/AddUSer";
import RequierdAuth from "./RequiredAuth";
import RefreshToken from "./RefreshToken";
import Products from "./products/Products";
import AddProduct from "./products/AddProduct";
import UpdateProduct from "./products/UpdateProduct";
import TheProducts from "./sections/TheProducts";
import Cart from "./sections/Cart";
import { useEffect, useState } from "react";
import Role from "./auth/Role";
function App() {
  const cookie = new Cookies();

  return (
    <div className="App">
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        <Route element={<RefreshToken />}>
          <Route path="/" element={<Home />} />
          <Route element={<RequierdAuth />}>
            <Route path="/TheProducts" element={<TheProducts />} />

            <Route element={<Role />}>
              <Route path="/Dashboard" element={<Dashboard />}>
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UpdateUser />} />
                <Route path="user/create" element={<AddUser />} />
                <Route path="products" element={<Products />} />
                <Route path="product/create" element={<AddProduct />} />
                <Route path="products/:id" element={<UpdateProduct />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
