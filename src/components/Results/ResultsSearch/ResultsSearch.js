import React, { useEffect, useState } from "react";
import "./ResultsSearch.css";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router";

const ResultsSearch = ({ userInput, fetchData, setParentInput }) => {
  const history = useHistory();
  const [input, setInput] = useState(userInput);

  const clearInput = () => {
    setInput("");
  };

  useEffect(() => {
    setInput(userInput);
  }, [userInput]);

  const submitHandler = (e, submitedInput = input) => {
    e.preventDefault();
    console.log(submitedInput);
    history.push({
      pathname: "/results",
      state: {
        input: submitedInput,
      },
    });
    setParentInput(submitedInput);
    fetchData(submitedInput);
  };

  return (
    <div className="resultsSearch">
      <SearchIcon />
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit"></button>
      </form>
      <CloseIcon
        onClick={clearInput}
        className={`close-icon ${input && "open"}`}
      />
    </div>
  );
};

export default ResultsSearch;
