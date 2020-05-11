# Student-Placement-Prediction

This repo is a webapp which does prediction for MBA students using Artifical Neural Network in the backend (served via Flask) and uses React.js and Material UI in frontend.

Dataset is downloaded from kaggle.
https://www.kaggle.com/benroshan/factors-affecting-campus-placement

placement_status.py will predict based on their input wheter they will get placement or not in Campus recruitment, this python file is used to generate the api.py
Accuracy of 91 percent.

# Demo

![Screenshot](/demos/Screenshot%202020-05-06%20at%203.40.22%20PM.png "Optional Title")
![Screenshot](/demos/Screenshot%202020-05-06%20at%208.37.18%20PM.png "Optional Title")
![Screenshot](/demos/Screenshot%202020-05-08%20at%202.32.12%20AM.png "Optional Title")

## Setup

To start the frontend client

`cd frontend && npm i && npm start`

To start the Flask API server
`cd frontend && npm run start-api`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the `frontend` directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run start-api`

Starts the backend Flask server located in top level `api/` directory

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
