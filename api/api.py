import flask
from flask import request
import time

import json
import requests
import boto3
from threading import Thread
import time

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


# Importing keras
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import Sequential, load_model
from flask_cors import CORS

app = flask.Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = False


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route("/api", methods=['GET', 'POST'])
def output():

    # Initalizing layers of ANN
    print("yes")
    print(str(request.headers))
    data = request.get_json()
    print(data)

    classifier = Sequential()

    # Adding input and hidden layer
    classifier.add(Dense(50, kernel_initializer="uniform",
                         activation='relu', input_dim=21))

    # Adding second hiddent layer
    classifier.add(Dense(50, kernel_initializer="uniform", activation='relu'))

    # Adding Output layer Linear for salary
    classifier.add(
        Dense(1, kernel_initializer="uniform", activation='sigmoid'))

    # Compiling the ANN
    classifier.compile(
        optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    regressor = load_model('placement_status.h5')

    ssc_p = float(data.get("SscP", "not provided"))
    hsc_p = float(data.get('HscP', 'not provided'))
    degree_p = float(data.get('DegreeP', 'not provided'))
    etest_p = float(data.get('EtestP', 'not provided'))
    mba_p = float(data.get('MbaP', 'not provided'))
    gender_F = data.get('gender', 'not provided')
    gender_M = 0
    if gender_F == "male":
        gender_F = 0
        gender_M = 1
    else:
        gender_F = 1
        gender_M = 0

    Work_Yes = data.get('WorkEx', 'not provided')
    workex_No = 0
    if Work_Yes == 0:
        workex_No = 1
    ssc_b_Central = data.get('SscBoardChecked', 'not provided')
    ssc_b_Others = 0
    if ssc_b_Central == 0:
        ssc_b_Others = 1

    hsc_b_Central = data.get('HscBoardChecked', 'not provided')
    hsc_b_Others = 0
    if hsc_b_Central == False:
        hsc_b_Others = 1
        hsc_b_Central = 0
    else:
        hsc_b_Central = 1

    spcs_Mkt = data.get('spcs', 0)
    spcs_HR = 0
    if spcs_Mkt == 0:
        spcs_HR = 1

    hsc_s_Arts = 0
    hsc_s_Commerce = 0
    hsc_s_Science = 0

    if data.get('HscStream', 'not provided') == "arts":
        hsc_s_Arts = 1

    if data.get('HscStream', 'not provided') == "comm":
        hsc_s_Commerce = 1

    if data.get('HscStream', 'not provided') == "sci":
        hsc_s_Science = 1

    degree_t_CommMgmt = 0
    degree_t_Others = 0
    degree_t_SciTech = 0

    if data.get('Degree', 'not provided') == "Commerce":
        degree_t_CommMgmt = 1

    if data.get('Degree', 'not provided') == "other":
        degree_t_Others = 1

    if data.get('Degree', 'not provided') == "Engineering":
        degree_t_SciTech = 1

    print(ssc_p, hsc_p, degree_p, etest_p, mba_p, gender_F, gender_M, ssc_b_Central, ssc_b_Others, hsc_b_Central,
          hsc_b_Others,  hsc_s_Arts, hsc_s_Commerce, hsc_s_Science, degree_t_CommMgmt, degree_t_Others, degree_t_SciTech, workex_No, Work_Yes, spcs_Mkt, spcs_HR)
    # for single prediction
    new_prediction = classifier.predict((np.array([[ssc_p, hsc_p, degree_p, etest_p, mba_p, gender_F, gender_M, ssc_b_Central, ssc_b_Others, hsc_b_Central,
                                                    hsc_b_Others,  hsc_s_Arts, hsc_s_Commerce, hsc_s_Science, degree_t_CommMgmt, degree_t_Others, degree_t_SciTech, workex_No, Work_Yes, spcs_Mkt, spcs_HR]])))
    new_prediction = (new_prediction > 0.5)

    print(type(new_prediction))

    return ({"placement_status": str(new_prediction[0][0])}, 200)


@app.route('/', methods=['GET'])
def home():

    print(request.get_json())
    return "Processing in background", 200  # Can return a HTML FILE too


if __name__ == '__main__':

    app.run(threaded=False)
