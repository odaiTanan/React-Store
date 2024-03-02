import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../context/context";

export default function Addproduct() {
  let first = true;
  const [title, titleSet] = useState("");
  const [decription, decriptionSet] = useState("");
  const [image, imageSet] = useState("");
  let nav = useNavigate();
  const mycontext = useContext(User);
  let token = mycontext.User1.tokens;
  let bool = true;
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", decription);
  formData.append("image", image);

  async function submitt(e) {
    e.preventDefault();

    first = false;
    if (
      first === false &&
      (title === "" || decription === "" || image === "")
    ) {
      document.querySelector("#null").style.display = "block";
      bool = false;
    } else {
      document.querySelector("#null").style.display = "none";
      bool = true;
    }

    if (bool) {
      try {
        axios
          .post("http://127.0.0.1:8000/api/product/create", formData, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then(() => {
            nav("/Dashboard/products");
          });
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  }

  return (
    <>
      <div className="signin-continer">
        <div className="k">
          <form action="" method="post">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter The Title"
              onChange={(e) => {
                titleSet(e.target.value);
              }}
              value={title}
              required
            />
            <label htmlFor="desc">Price</label>
            <input
              type="text"
              id="desc"
              placeholder="Enter description"
              onChange={(e) => {
                decriptionSet(e.target.value);
              }}
              value={decription}
              required
            />
            <label htmlFor="img">Image</label>
            <input
              type="file"
              id="img"
              placeholder="Enter The image"
              onChange={(e) => {
                imageSet(e.target.files.item(0));
              }}
              required
            />
            <p className="error" id="null">
              please fill every field
            </p>
            <button
              type="submit"
              onClick={(e) => {
                submitt(e);
              }}
            >
              create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
