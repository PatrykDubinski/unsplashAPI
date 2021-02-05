import React, { useEffect, useState } from "react";
import "./HomeSearch.scss";
import { useHistory } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from "../../redux/Photos/photos.actions";

const mapState = ({ photos }) => ({
  topics: photos.topics,
  loading: photos.loading,
});

const HomeSearch = () => {
  const dispatch = useDispatch();
  const { topics, loading } = useSelector(mapState);
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const history = useHistory();

  useEffect(() => {
    dispatch(getTopics());
  }, []);

  const onInputChange = (e) => {
    setInput(e.target.value);
    setFilteredSuggestions(
      topics.filter(
        (sugg) => sugg.toLowerCase().indexOf(input.toLowerCase()) > -1
      )
    );
    if (input.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const submitHandler = (e, submitedInput = input) => {
    e.preventDefault();
    history.push({
      pathname: `/results/?query=${submitedInput}`,
      state: {
        input: submitedInput,
      },
    });
  };

  const suggestionHandler = (e) => {
    setShowSuggestions(false);
    setInput(e.currentTarget.innerText);
    setFilteredSuggestions([]);

    submitHandler(e, e.currentTarget.innerText);
  };

  let suggestionsList;
  if (showSuggestions && input.length >= 3) {
    if (filteredSuggestions.length > 0) {
      suggestionsList = (
        <ul className="suggestions">
          {loading && <h1 className="loading">Loading...</h1>}
          {!loading &&
            filteredSuggestions.map((suggestion, index) => {
              return (
                <li onClick={(e) => suggestionHandler(e)} key={index}>
                  {suggestion}
                </li>
              );
            })}
        </ul>
      );
    } else {
      suggestionsList = (
        <ul className="suggestions">
          <li>No suggestions!</li>
        </ul>
      );
    }
  }

  const clearInput = () => {
    setInput("");
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  return (
    <>
      <div className="homeSearch">
        <SearchIcon />
        <form onSubmit={(e) => submitHandler(e)}>
          <input type="text" value={input} onChange={(e) => onInputChange(e)} />
          <button type="submit" />
        </form>
        <CloseIcon
          onClick={clearInput}
          className={`close-icon ${input.length >= 3 && "open"}`}
        />
      </div>
      {suggestionsList}
    </>
  );
};

export default HomeSearch;
