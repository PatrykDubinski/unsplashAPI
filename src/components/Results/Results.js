import React, { useEffect, useState } from "react";
import "./Results.css";
import { useHistory } from "react-router";
import axios from "axios";
import GridImage from "./GridImage/GridImage";

const Results = () => {
  const history = useHistory();
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userInput = history.location.state.input;
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.unsplash.com/topics/?query=${userInput}&per_page=30&client_id=r_ruFK7cQ0xgt_Icvkf1_-uo6keov-j5eXAhml0RItg`
      );

      setImages(response.data);
    }

    fetchData();
  }, [userInput]);

  let reducedImages = images.map((obj) => {
    const name = obj.cover_photo.user.name;
    const username = obj.cover_photo.user.username;
    const profileImg = obj.cover_photo.user.profile_image.small;
    const location = obj.cover_photo.user.location;
    const images = obj.cover_photo.urls.regular;
    return {
      id: obj.id,
      name,
      username,
      profileImg,
      location,
      images,
    };
  });

  return (
    <section className="results">
      {/* Search component */}
      <h1>{userInput}</h1>
      {/* Filters */}
      <div className="results__grid">
        {reducedImages.map((obj) => (
          <GridImage
            key={obj.id}
            img={obj.images}
            profileImg={obj.profileImg}
            location={obj.location}
            name={obj.name}
            username={obj.username}
            onClick={setShowModal(true)}
          />
        ))}
      </div>
    </section>
  );
};

export default Results;
