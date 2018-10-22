import React from "react";

import Button from "@material-ui/core/Button";

const timerActionButton = props => {
  if (props.timerIsRunning) {
    return (
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        onClick={props.onStopClick}
      >
        Stop
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      onClick={props.onStartClick}
    >
      Start
    </Button>
  );
};

export default timerActionButton;
