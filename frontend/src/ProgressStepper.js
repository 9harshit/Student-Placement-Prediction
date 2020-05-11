import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { StepIcon } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "red",
  },
  icon: {
    color: "green",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Fill your details", "Hang in there", "Check the results"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Fill your details";
    case 1:
      return "Hang in there";
    case 2:
      return "Check the results!";
    default:
      return "Unknown stepIndex";
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className={classes.icon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
