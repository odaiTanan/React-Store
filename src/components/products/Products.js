import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../context/context";

export default function Products() {
  let token;

  let dataContext = useContext(User);
  token = dataContext.User1.tokens;
  const [products, setProducts] = useState([]);

  //Get Data
  const [deleted, setDeleted] = useState(false);
  let a = 0;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [deleted]);
  function Delete(id) {
    axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setDeleted(!deleted);
  }
  let dataShow = products.map((product, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>
          <img
            style={{ width: "50px", height: "50px" }}
            src={product.image}
          ></img>
        </td>
        <td style={{ display: "flex" }}>
          <i
            className="fa-solid fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => Delete(product.id)}
          />
          <Link to={`${product.id}`}>
            <i
              className="fa-solid fa-pen-to-square"
              style={{
                color: "chartreuse",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            />
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th align="left">Id</th>
            <th align="left">title</th>
            <th align="left">price</th>
            <th align="left">image</th>
          </tr>
        </thead>
        <tbody>{dataShow}</tbody>
      </table>
    </div>
  );
}
