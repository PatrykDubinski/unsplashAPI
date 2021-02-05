import React, { useEffect, useState } from "react";
import "./ResultsSearch.scss";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router";

const ResultsSearch = ({ userInput, setParentInput }) => {
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
    history.push({
      pathname: `/results/?query=${submitedInput}`,
      state: {
        input: submitedInput,
      },
    });
    setParentInput(submitedInput);
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
