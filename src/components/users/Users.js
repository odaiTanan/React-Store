import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../context/context";

export default function Users() {
  const [data, dataSet] = useState([]);
  const [deleted, deletedSet] = useState(false);
  let token;

  let dataContext = useContext(User);
  token = dataContext.User1.tokens;
  //Get Data
  try {
    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/api/user/show", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((data) => {
          dataSet(data.data);
        });
    }, [deleted]);
  } catch (e) {
    console.log(e);
  }
  let a = 0;
  const dataShow = data.map((user, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td style={{ display: "flex" }}>
          <i
            className="fa-solid fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => Delete(user.id)}
          />
          <Link to={`${user.id}`}>
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
  async function Delete(id) {
    await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    deletedSet(!deleted);
  }
  //Show Data

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th align="left">Id</th>
            <th align="left">Name</th>
            <th align="left">Email</th>
          </tr>
        </thead>
        <tbody>{dataShow}</tbody>
      </table>
    </div>
  );
}
