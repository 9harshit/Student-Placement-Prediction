import React from "react";

import FormContainer from "./FormContainer";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

import SubmitBtn from "./button";
import ProgressStepper from "./ProgressStepper";
import ResultDialog from "./result";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormLabel,
  RadioGroup,
  Radio,
  Slider,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = (theme) => ({
  row: {
    justifyContent: "space-between",

    minWidth: "100%",
    display: "flex",
    marginBottom: "20px",
  },

  items: {
    display: "flex",
    marginLeft: "0px",
  },
});

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSuccess: false,
      HscBoardChecked: false,
      SscBoardChecked: false,
      activeStep: 0,
      isSkeletonActive: true,

      marks: [
        {
          value: 0,
          label: "0",
        },
        {
          value: 1,
          label: "1",
        },
        {
          value: 5,
          label: "5",
        },
        {
          value: 10,
          label: "10",
        },
      ],
    };
  }
  componentDidMount = () => {
    setTimeout(
      function () {
        this.setState({ isSkeletonActive: false });
      }.bind(this),
      3000
    );
  };

  predictPlacement = (event) => {
    this.setState({
      isLoading: true,
      activeStep: 1,
    });
    console.log("yes");
    console.log(this.state);
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/api`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        console.log(data);
        this.setState({
          placementStatus: data.placement_status,
          isLoading: false,
          isSuccess: true,
          activeStep: 2,
        });
      })
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
    event.preventDefault();
  };
  handleDialogClose = () => {
    this.setState({
      isSuccess: false,
      isLoading: false,
      activeStep: 3,
    });
  };

  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleHscBoardChange = (event) => {
    this.setState({
      HscBoardChecked: event.target.checked,
    });
  };

  handleSscBoardChange = (event) => {
    this.setState({
      SscBoardChecked: event.target.checked,
    });
  };

  handleSscPChange = (event) => {
    this.setState({
      SscP: event.target.value,
    });
  };
  handleHscPChange = (event) => {
    this.setState({
      HscP: event.target.value,
    });
  };

  handleHscStreamChange = (event) => {
    this.setState({
      HscStream: event.target.value,
    });
  };

  handleDegreeChange = (event) => {
    this.setState({
      Degree: event.target.value,
    });
  };
  handleMbaPChange = (event) => {
    this.setState({
      MbaP: event.target.value,
    });
  };
  handleEtestPChange = (event) => {
    this.setState({
      EtestP: event.target.value,
    });
  };
  handleDegreePChange = (event) => {
    this.setState({
      DegreeP: event.target.value,
    });
  };
  handleWorkExChange = (event, workEx) => {
    this.setState({
      WorkEx: workEx,
    });
  };

  onFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
  };
  render() {
    const { classes } = this.props;
    return (
      <FormContainer>
        {this.state.isSkeletonActive ? (
          <Skeleton
            animation="wave"
            variant="square"
            width={"100%"}
            height={"inherit"}
          />
        ) : (
          <div className="form-content--container">
            <form onSubmit={this.predictPlacement} className="form-content">
              <ProgressStepper activeStep={this.state.activeStep} />

              <ResultDialog
                open={this.state.isSuccess}
                title="Prediction results"
                description={
                  this.state.placementStatus === true
                    ? "Congrats! We think you will be placed!"
                    : "Sorry. You need more work to do!"
                }
                button1="Okay"
                button2="Cancel"
                handleClose={this.handleDialogClose}
              ></ResultDialog>

              <TextField
                className={classes.row}
                required
                id="filled-required"
                label="Name"
                variant="filled"
                value={this.state.name}
                onChange={this.handleNameChange}
              />

              <FormGroup row className={classes.row}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    required
                    row
                    aria-label="gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleGenderChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      name="SSC_Board"
                      checked={this.state.SscBoardChecked}
                      onChange={this.handleSscBoardChange}
                    />
                  }
                  label="SSC - Central"
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="HSC_Board"
                      color="primary"
                      checked={this.state.HscBoardChecked}
                      onChange={this.handleHscBoardChange}
                    />
                  }
                  label="HSC - Central"
                />{" "}
              </FormGroup>
              <FormGroup row className={classes.row}></FormGroup>

              <FormGroup row className={classes.row}>
                <FormControlLabel
                  className={classes.items}
                  control={
                    <TextField
                      id="standard-number"
                      required
                      label="HSC %"
                      type="number"
                      max="100"
                      value={this.state.HscP}
                      onChange={this.handleHscPChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  }
                />
                <FormControlLabel
                  className={classes.items}
                  control={
                    <TextField
                      id="standard-number"
                      required
                      label="SSC %"
                      type="number"
                      minValue={0}
                      value={this.state.SscP}
                      onChange={this.handleSscPChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  }
                />
              </FormGroup>
              <FormGroup row className={classes.row}>
                <FormControl
                  className={classes.items}
                  variant="filled"
                  style={{ width: "40%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    HSC Stream
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={this.state.HscStream}
                    onSelect={this.handleHscStreamChange}
                  >
                    <MenuItem value="None">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Science"}>Science</MenuItem>
                    <MenuItem value={"Commerce"}>Commerce</MenuItem>
                    <MenuItem value={"Arts"}>Arts</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  className={classes.items}
                  variant="filled"
                  style={{ width: "40%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Degree
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={this.state.Degree}
                    onSelect={this.handleDegreeChange}
                  >
                    <MenuItem value=" ">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"10"}>Commerece</MenuItem>
                    <MenuItem value={"20"}>Engineering</MenuItem>
                    <MenuItem value={"30"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
              <FormGroup row className={classes.row}>
                <FormControlLabel
                  className={classes.items}
                  control={
                    <TextField
                      id="standard-number"
                      label="MBA %"
                      type="number"
                      value={this.state.MbaP}
                      onChange={this.handleMbaPChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  }
                />
                <FormControlLabel
                  className={classes.items}
                  control={
                    <TextField
                      id="standard-number"
                      label="E-Test %"
                      type="number"
                      value={this.state.EtestP}
                      onChange={this.handleEtestPChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  }
                />
                <FormControlLabel
                  className={classes.items}
                  control={
                    <TextField
                      id="standard-number"
                      label="Degree %"
                      type="number"
                      value={this.state.DegreeP}
                      onChange={this.handleDegreePChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  }
                />
              </FormGroup>
              <FormGroup row>
                <Typography id="discrete-slider-small-steps" gutterBottom>
                  Work Experience
                </Typography>

                <Slider
                  style={{ marginLeft: "30px", width: "300px" }}
                  defaultValue={0}
                  aria-labelledby="discrete-slider-small-steps"
                  step={1}
                  marks
                  min={0}
                  max={10}
                  valueLabelDisplay="auto"
                  marks={this.state.marks}
                  value={this.state.WorkEx}
                  onChange={this.handleWorkExChange}
                />
              </FormGroup>

              <SubmitBtn
                type="submit"
                onSubmit={this.predictPlacement}
                success={this.state.isSuccess}
                loading={this.state.isLoading}
              ></SubmitBtn>
            </form>
          </div>
        )}{" "}
      </FormContainer>
    );
  }
}

export default withStyles(useStyles)(InputForm);
