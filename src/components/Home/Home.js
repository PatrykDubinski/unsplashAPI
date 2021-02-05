import React from "react";
import "./Home.scss";

import { StyledHome } from "../StyledComponents/StyledComponents";
import HomeSearch from "../../containers/HomeSearch/HomeSearch";

const Home = () => {
  return (
    <StyledHome>
      <div className="home__content">
        <h1>Unsplash</h1>
        <h4>
          The internet's source of{" "}
          <span className="underlined">freely-usable-images</span>.
        </h4>
        <h4> Powered by creators everywhere.</h4>
        <HomeSearch />
        <div className="home__content-trending">
          <p>
            <strong>Trending: </strong>flower, wallpapers, backgrounds, happy,
            love
          </p>
        </div>
      </div>
    </StyledHome>
  );
};

export default Home;
