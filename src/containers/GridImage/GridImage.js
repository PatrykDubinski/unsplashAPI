import React, { useState } from "react";
import "./GridImage.scss";

import Modal from "../../components/utils/Modal/Modal";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { getPhotos } from "../../redux/Photos/photos.actions";

const GridImage = ({
  img,
  location,
  username,
  name,
  profileImg,
  tags,
  setParentInput,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  let reducedTags = tags.map((tag) => {
    return tag.title;
  });

  const submitHandler = (e, submitedInput = e.target.innerText) => {
    e.preventDefault();
    history.push({
      pathname: `/results/?query=${e.target.innerText}`,
      state: {
        input: submitedInput,
      },
    });
    setParentInput(submitedInput);
    dispatch(getPhotos(submitedInput));
  };

  return (
    <>
      <div className="gridImage">
        <div className="gridImage__top" onClick={showModalHandler}>
          <img src={img} alt={location} />
        </div>
        <div className="gridImage__bottom">
          {reducedTags.map((tag, i) => (
            <div
              key={i}
              className="gridImage__bottom-tag"
              onClick={(e) => submitHandler(e, e.target.innerText)}
            >
              {tag}
            </div>
          ))}
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
