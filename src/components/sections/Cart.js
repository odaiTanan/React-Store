import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Cookies from "universal-cookie";
import { Data } from "../context/DataCartContext";

export default function Cart() {
  const DataCart = useContext(Data);

  let ContextData = DataCart.Data1;
  const [total, setTotal] = useState(0);

  //delete an item from cart
  function delet(id) {
    ContextData.map((item) => {
      if (item.id === id) {
        //remove from total
        let val = total;
        //remove from array
        setTotal(val - item.pr);
        const newArray = ContextData.filter((item) => {
          return item.id !== id;
        });
        let cook = new Cookies();
        cook.set("buyed", newArray);
        DataCart.setData(newArray);
      }
    });
  }
  //Show data in cart
  const [dataShown, dataShowSet] = useState(null);

  function dataShow() {
    dataShowSet(
      ContextData.map((buyed, index) => {
        return (
          <tr key={index} id={buyed.id}>
            <td>
              <h1>{buyed.title}</h1>
            </td>
            <td>
              <p>{buyed.quantity}</p>
            </td>
            <td>
              <p>{buyed.pr} $</p>
            </td>
            <td>
              <i
                className="fa-solid fa-trash"
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => delet(buyed.id)}
              />
            </td>
          </tr>
        );
      })
    );
  }
  //get total price function
  function getTotal() {
    let calc = 0;
    ContextData.map((item) => {
      calc += item.pr;
    });
    setTotal(calc);
  }

  //get total price in every change

  useEffect(() => {
    if (ContextData) {
      getTotal();
      dataShow();
    }
  }, [ContextData]);
  return (
    <div>
      <div className="cartcontiner" id="cartcontiner">
        <div className="close"></div>
        <h1>Your Cart</h1>
        <div className="total" id="tot">
          total is: {total} $
        </div>
        <table id="table">
          <thead>
            <tr>
              <th>
                <p>object</p>
              </th>
              <th>
                <p>Number</p>
              </th>
              <th>
                <p>Price</p>
              </th>
            </tr>
          </thead>
          <tbody id="tbody">{dataShown}</tbody>
        </table>
        {total > 0 ? (
          <div className="conbuy">
            <div onClick={() => alert("Buy done")}>Check Out</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
