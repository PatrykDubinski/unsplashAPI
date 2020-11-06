import React, { useEffect, useState } from "react";
import "./Results.css";
import { useHistory } from "react-router";
import axios from "axios";

import GridImage from "./GridImage/GridImage";
import ResultsSearch from "./ResultsSearch/ResultsSearch";

const Results = () => {
  const history = useHistory();
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userInput = history.location.state.input;
  const [resultsInput, setResultsInput] = useState(userInput);

  async function fetchData(input) {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos/?query=${input}&per_page=30&client_id=r_ruFK7cQ0xgt_Icvkf1_-uo6keov-j5eXAhml0RItg`
    );

    setImages(response.data.results);
  }

  useEffect(() => {
    fetchData(resultsInput);
  }, []);

  let reducedImages = images.map((obj) => {
    const name = obj.user.name;
    const username = obj.user.username;
    const profileImg = obj.user.profile_image.small;
    const location = obj.user.location;
    const images = obj.urls.regular;
    const tags = obj.tags;
    return {
      id: obj.id,
      name,
      username,
      profileImg,
      location,
      images,
      tags,
    };
  });

  const changeInputHandler = (val) => {
    setResultsInput(val);

    // submited
    fetchData(resultsInput);
  };

  return (
    <section className="results">
      <ResultsSearch
        userInput={resultsInput}
        fetchData={fetchData}
        setParentInput={setResultsInput}
      />
      <h1 className="results__title">{resultsInput}</h1>

      <div className="results__grid">
        {reducedImages.map((obj) => (
          <GridImage
            key={obj.id}
            img={obj.images}
            profileImg={obj.profileImg}
            location={obj.location}
            name={obj.name}
            username={obj.username}
            tags={obj.tags}
            showModal={showModal}
            userInput={resultsInput}
            fetchData={fetchData}
            setParentInput={setResultsInput}
          />
        ))}
      </div>
    </section>
  );
};

export default Results;
