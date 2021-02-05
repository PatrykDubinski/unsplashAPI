import React, { useEffect, useState } from "react";
import "./Results.scss";
import { useHistory } from "react-router";
import GridImage from "../GridImage/GridImage";
import ResultsSearch from "../../components/ResultsSearch/ResultsSearch";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../redux/Photos/photos.actions";

const mapState = ({ photos }) => ({
  photos: photos.photos,
  loading: photos.loading,
});

const Results = () => {
  const dispatch = useDispatch();
  const { photos, loading } = useSelector(mapState);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const userInput = history.location.state.input;
  const [resultsInput, setResultsInput] = useState(userInput);

  useEffect(() => {
    dispatch(getPhotos(resultsInput));
  }, []);

  const flattened = [].concat.apply(
    [],
    photos.map((obj) => obj.tags)
  );
  const allTags = flattened.map((single) => single.title);

  const reducedImages = photos.map((obj) => {
    return {
      id: obj.id,
      name: obj.user.name,
      username: obj.user.username,
      profileImg: obj.user.profile_image.small,
      location: obj.user.location,
      images: obj.urls.regular,
      tags: obj.tags,
    };
  });

  const filterClick = (e) => {
    setResultsInput(e.target.innerText);
    dispatch(getPhotos(e.target.innerText));
    history.push({
      pathname: `/results/?query=${e.target.innerText}`,
      state: {
        input: e.target.innerText,
      },
    });
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
        setParentInput={setResultsInput}
      />
      <h1 className="results__title">{resultsInput}</h1>
      <div className="results__filters">{flattened.length > 0 && filters}</div>
      <div className="results__grid">
        {loading && <h1 className="loading">Loading...</h1>}
        {!loading ? (
          reducedImages.length > 0 ? (
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
                setParentInput={setResultsInput}
              />
            ))
          ) : (
            <div className="no-found">No images found </div>
          )
        ) : null}
      </div>
    </section>
  );
};

export default Results;
