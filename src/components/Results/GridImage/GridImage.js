import React, { useState } from "react";
import "./GridImage.css";

import Modal from "../Modal/Modal";

const GridImage = ({ img, location, username, name, profileImg }) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="gridImage" onClick={showModalHandler}>
        <div className="gridImage__top">
          <img src={img} alt={location} />
        </div>
      </div>
      {showModal && (
        <Modal
          img={img}
          profileImg={profileImg}
          location={location}
          name={name}
          username={username}
          modalShow={closeHandler}
          show={showModal}
        />
      )}
    </>
  );
};

export default GridImage;
