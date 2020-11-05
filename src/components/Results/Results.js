import React, { useEffect, useState } from "react";
import "./Results.css";
import { useHistory } from "react-router";
import axios from "axios";

const Results = () => {
  const history = useHistory();
  const [images, setImages] = useState([]);
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
  console.log(images);

  // let reducedImages = images.map((img) => img.preview_photos);
  // reducedImages = reducedImages.map((arr) => arr.reduce((el) => el));
  // reducedImages = reducedImages.map((img) => img.urls.small);
  let reducedImages = images
    .map((img) => img.preview_photos)
    .map((arr) => arr.reduce((el) => el))
    .map((img) => img.urls.small);
  console.log(reducedImages);

  return (
    <section className="results">
      {/* Search component */}
      <h1>{userInput}</h1>
      {/* Filters */}
      <div className="results__grid"></div>
    </section>
  );
};

export default Results;
