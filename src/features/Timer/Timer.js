import React, { Component } from "react";

import TimerActionButton from "./TimerActionButton";
import renderElapsedString from "../../libs/timerHelper";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  root: {
    width: "300px",
    marginTop: "0px",
    marginBottom: "40px"
  },
  timerContainer: {
    marginTop: "16px"
  },
  time: { marginTop: "15px" }
};

class Timer extends Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render() {
    const {
      classes,
      title,
      project,
      elapsed,
      runningSince,
      onStartClick,
      onStopClick,
      onDeleteClick,
      onEditClick
    } = this.props;
    return (
      <Card className={classes.root}>
        <div className={classes.timerContainer}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1">{project}</Typography>
          <Typography variant="h4">
            {renderElapsedString(elapsed, runningSince)}
          </Typography>
        </div>
        <div>
          <IconButton onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        </div>
        <CardActions>
          <TimerActionButton
            timerIsRunning={!!this.props.runningSince}
            onStartClick={onStartClick}
            onStopClick={onStopClick}
          />
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Timer);
