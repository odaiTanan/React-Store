import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./style.css";
import "./components/dashboard/Dashboard.css";
import "./all.min.css";
import { BrowserRouter as R } from "react-router-dom";
import UserProvider from "./components/context/context";
import DataCartProvider from "./components/context/DataCartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <R>
      <UserProvider>
        <DataCartProvider>
          <App />
        </DataCartProvider>
      </UserProvider>
    </R>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </>
);
