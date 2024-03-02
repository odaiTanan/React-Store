import React from "react";
import { useState } from "react";

const Show = () => {
  const [Show, setShow] = useState(false);
  return { Show, setShow };
};

export default Show;
