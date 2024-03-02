import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import "./products.css";
import { User } from "../context/context";
import { Data } from "../context/DataCartContext";
import Cookies from "universal-cookie";

export default function TheProducts() {
  let cookie = new Cookies();

  const DataCart = useContext(Data);
  cookie.set("buyed", DataCart.Data1);
  const [data, setData] = useState([]);

  let bool = true;
  let [number, setNumber] = useState(1);
  let user = useContext(User);
  let token = user.User1.tokens;

  async function addToCart(id, quantity, title, price) {
    let pr = parseFloat(price) * number;

    if (DataCart.Data1?.length > 0) {
      await DataCart.Data1.map((i) => {
        if (i.id == id) {
          let newQuantity = +i.quantity + +quantity;

          let newPrice = parseFloat(price) * newQuantity;
          i.quantity = newQuantity;
          i.pr = newPrice;

          bool = false;
          DataCart.setData((prevState) => [...prevState]);
        }
      });

      if (bool) {
        DataCart.setData((prevState) => [
          ...prevState,
          { id, quantity, title, pr },
        ]);
      }
    } else {
      DataCart.setData([{ id, quantity, title, pr }]);
    }
  }
  try {
    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/api/product/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((data) => {
          setData(data.data);
        });
    }, []);
  } catch (e) {
    console.log(e);
  }

  const dataShow = data.map((product, index) => {
    return (
      <div className="card" key={index}>
        <div className="img" style={{ backgroundColor: "rgb(40,39,39)" }}>
          <img src={product.image} alt="wrong" />
        </div>
        <h1>{product.title}</h1>

        <div className="priceAndAdd">
          <p>{product.description}</p>
          <input
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            type="number"
            min={1}
            style={{ width: "50px" }}
          />
          <i
            className="fas fa-cart-plus"
            onClick={() =>
              addToCart(product.id, +number, product.title, product.description)
            }
          ></i>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="cardsCon">{dataShow}</div>
      </div>
    </div>
  );
}
