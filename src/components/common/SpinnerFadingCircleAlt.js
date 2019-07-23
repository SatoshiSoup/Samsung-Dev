import React from "react";
var Spinner = require("react-native-spinkit");

const SpinnerFadingCircleAlt = () => {
  return (
    <Spinner
      isVisible={true}
      size={40}
      type={"FadingCircleAlt"}
      color={"#0074DB"}
    />
  );
};

export default SpinnerFadingCircleAlt;
