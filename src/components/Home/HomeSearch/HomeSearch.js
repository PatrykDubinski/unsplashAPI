import React, { useEffect, useState } from "react";
import "./HomeSearch.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const HomeSearch = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const history = useHistory();

  // "https://api.unsplash.com/topics/?per_page=100&client_id=r_ruFK7cQ0xgt_Icvkf1_-uo6keov-j5eXAhml0RItg"

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://api.unsplash.com/topics/?per_page=100&client_id=r_ruFK7cQ0xgt_Icvkf1_-uo6keov-j5eXAhml0RItg"
      );

      const fetchedSuggestions = response.data.map((title) => {
        return title.title;
      });
      setSuggestions(fetchedSuggestions);
    }

    fetchData();
  }, []);

  const onInputChange = (e) => {
    setInput(e.target.value);
    const filterSuggestions = suggestions.filter(
      (sugg) => sugg.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setFilteredSuggestions(filterSuggestions);
    if (input.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const submitHandler = (e, submitedInput = input) => {
    e.preventDefault();
    history.push({
      pathname: "/results",
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
          {filteredSuggestions.map((suggestion, index) => {
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
