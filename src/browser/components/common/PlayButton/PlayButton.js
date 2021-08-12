import React from "react";

import PlayButtonIcon from "assets/icons/trailer-play-button.svg";

const PlayButton = () => (
  <button type="button" className="play-button-wrapper">
    <PlayButtonIcon />
  </button>
);

PlayButton.propTypes = {};

export default PlayButton;
