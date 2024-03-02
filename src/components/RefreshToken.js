import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { User } from "./context/context";
import Cookies from "universal-cookie";
import axios from "axios";
import Loading from "./Loading";
import { useState } from "react";
import { Data } from "./context/DataCartContext";
export default function RefreshToken() {
  let buyedContext = useContext(Data);
  let dataContext = useContext(User);
  let old = dataContext.User1;
  const [boole, setBoole] = useState(true);
  const [yes, setYes] = useState(false);
  let cookie = new Cookies();

  let token = cookie.getAll("Be").Be;
  let role = cookie.get("role");

  let nav = useNavigate();
  let loc = useLocation();
  useEffect(() => {
    try {
      if (token) {
        async function refresh() {
          let res = await axios.post(
            "http://127.0.0.1:8000/api/refresh",
            null,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          const tokens = res.data.token;
          const userInformation = res.data.user;
          const newCookie = new Cookies();
          newCookie.set("Be", tokens, { path: "/" });
          cookie.remove(cookie.getAll("Be")[0]);
          setBoole(false);
          dataContext.SetUser1((prev) => {
            return { tokens: tokens, userInformation: userInformation };
          });
          let buyedCookie = new Cookies();
          buyedContext.setData(buyedCookie.get("buyed"));
        }
        old ? setBoole(false) : refresh();
      } else {
        nav("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <>{!boole ? <Outlet /> : <Loading />}</>;
}
