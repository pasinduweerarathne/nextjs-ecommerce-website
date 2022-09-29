import React from "react";
import Model from "./Model";
import Navbar from "./Navbar";
import Notify from "./Notify";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      <Notify />
      <Model />
      {children}
    </div>
  );
};

export default Layout;
