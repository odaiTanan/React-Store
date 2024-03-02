import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { User } from "../context/context";
import { useLocation, useNavigate } from "react-router-dom";
export default function Products() {
  let id = window.location.pathname.split("/").slice(-1)[0];

  const [title, titleSet] = useState("");
  const [description, descriptionSet] = useState("");
  const [image, imageSet] = useState("");

  let nav = useNavigate();
  const mycontext = useContext(User);
  let token = mycontext.User1.tokens;
  let bool = true;
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        titleSet(data[0].title);
        descriptionSet(data[0].description);
        imageSet(data[0].image);
      });
  }, []);

  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  async function submitt(e) {
    e.preventDefault();
    if (title === "" || description === "" || image == -"") {
      bool = false;
      document.getElementById("null").style.display = "block";
    } else {
      document.getElementById("null").style.display = "none";
    }

    if (bool) {
      try {
        let res = await axios.post(
          `http://127.0.0.1:8000/api/product/update/${id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        nav("/Dashboard/products");
      } catch (error) {
        alert(error.response.data.message);
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
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              id="desc"
              placeholder="Enter description"
              onChange={(e) => {
                descriptionSet(e.target.value);
              }}
              value={description}
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
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
