import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import InputForm from "./InputForm";
import { Button } from "@material-ui/core";

function Home(props) {
  
  return (
    <div className="home">
      <div className="home-content">
        <div className="home-content--image-container">
          <div className="home-content--image">
            <img
              id="image"
              src="/undraw_predictive_analytics_kf9n.png"
              alt="logo"
            />
          </div>
        </div>

        <div className="home-content--desc">
          <h1>Predicting Student Placement</h1>
          <p>
            This is a webapp which does prediction for MBA students using
            Artifical Neural Network in the backend (served via Flask) and uses
            React.js and Material UI in frontend.
          </p>
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "200px", height: "60px" }}
            >
              Check yours!
            </Button>
          </div>
        </div>
      </div>
      <InputForm />
    </div>
  );
}

export default Home;
