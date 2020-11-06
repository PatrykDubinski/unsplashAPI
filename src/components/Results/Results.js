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

  let allTags = images.map((obj) => obj.tags);
  const flattened = [].concat.apply([], allTags);
  if (flattened.length > 0) {
    allTags = flattened.map((single) => single.title);
  }

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

  const filterClick = (e) => {
    setResultsInput(e.target.innerText);

    fetchData(e.target.innerText);
  };
  let filters = [];
  for (let i = 0; i < 8; i++) {
    filters[i] = allTags[i];
  }
  filters = filters.map((filter, i) => (
    <div className="filter__box" key={i} onClick={(e) => filterClick(e)}>
      <p>{filter}</p>
    </div>
  ));

  return (
    <section className="results">
      <ResultsSearch
        userInput={resultsInput}
        fetchData={fetchData}
        setParentInput={setResultsInput}
      />
      <h1 className="results__title">{resultsInput}</h1>
      <div className="results__filters">{flattened.length > 0 && filters}</div>
      <div className="results__grid">
        {reducedImages.length > 0 ? (
          reducedImages.map((obj) => (
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
          ))
        ) : (
          <div className="no-found">No images found </div>
        )}
      </div>
    </section>
  );
};

export default Results;
