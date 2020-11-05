import React from "react";
import "./Modal.css";

import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import RoomIcon from "@material-ui/icons/Room";
import ReplyIcon from "@material-ui/icons/Reply";
import InfoIcon from "@material-ui/icons/Info";
import Background from "./Background/Background";

const Modal = ({
  img,
  location,
  username,
  name,
  profileImg,
  modalShow,
  show,
}) => {
  return (
    <>
      <Background closeHandler={modalShow} show={show} />
      <div className="modal">
        <div className="modal__top">
          <div className="modal__top-person">
            <div className="modal__top-person--img">
              <img src={profileImg} alt={username} />
            </div>
            <div className="modal__top-person--names">
              <p className="fullname">{name}</p>
              {username && <p className="username">@{username}</p>}
            </div>
          </div>
          <div className="modal__top-buttons">
            <div className="modal__top-buttons--like">
              <FavoriteIcon />
            </div>
            <div className="modal__top-buttons--add">
              <AddIcon />
            </div>
          </div>
        </div>
        <div className="modal__img">
          <img src={img} />
        </div>
        <div className="modal__bottom">
          <div className="modal__bottom-location">
            {location && (
              <p>
                <RoomIcon /> {location}
              </p>
            )}
          </div>
          <div className="modal__bottom-buttons">
            <div className="modal__bottom-buttons--share">
              <ReplyIcon /> Share
            </div>
            <div className="modal__bottom-buttons--info">
              <InfoIcon /> Info
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
