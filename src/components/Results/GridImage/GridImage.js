import React from "react";
import "./GridImage.css";

const GridImage = ({ img, location, username, name, profileImg }) => {
  return (
    <div className="gridImage">
      <div className="gridImage__top">
        <img src={img} alt={location} />
      </div>
    </div>
  );
};

export default GridImage;
