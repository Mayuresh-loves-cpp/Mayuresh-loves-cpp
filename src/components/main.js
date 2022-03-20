import React from "react";

import { Navbar } from "./subComponents/main/navbar";
import { Containers } from "./subComponents/main/main";
import "../styles/main.css";

export const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Containers></Containers>
    </div>
  );
};
