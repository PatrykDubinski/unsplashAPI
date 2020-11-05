import React from "react";
import "./Background.css";

const Background = ({ closeHandler, show }) => {
  return show && <div className="background" onClick={closeHandler}></div>;
};

export default Background;
