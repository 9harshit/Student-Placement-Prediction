# Classification template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Placement_Data_Full_Class.csv')
sat = []
sat = dataset["status"] 
dataset = dataset.drop(["status","salary"],  axis =1)

dataset = pd.get_dummies(dataset, columns=["gender",'ssc_b',"hsc_b","hsc_s","degree_t","workex","specialisation"])

dataset = dataset.join(sat)

X = pd.DataFrame(dataset.iloc[:, :21].values)
y = pd.DataFrame(dataset.iloc[:, 21].values)

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

# Importing keras
import keras
from keras.models import Sequential
from keras.layers import Dense 

# Initalizing layers of ANN
classifier = Sequential()

# Adding input and hidden layer
classifier.add(Dense(output_dim = 50, init = "uniform" , activation = 'relu' , input_dim = 21))

# Adding second hiddent layer
classifier.add(Dense(output_dim = 50, init = "uniform" , activation = 'relu' ))

# Adding Output layer Linear for salary
classifier.add(Dense(output_dim = 1, init = "uniform" , activation = 'sigmoid'))

# Compiling the ANN
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])

# Fitting the Tr
classifier.fit(X_train, y_train, batch_size = 5, epochs = 100)


#classifier.save("placement_status.h5")


from keras.models import load_model
regressor=load_model('placement_status.h5')

# Predicting the Test set results
#y_pred = classifier.predict(X_test)

ssc_p = input()
hsc_p = input()
degree_p = input()
etest_p = input()
mba_p = input()
gender_F = input()
gender_M = input()
ssc_b_Central = input()
ssc_b_Others = input()
hsc_b_central = input()
hsc_b_Others = input()
hsc_s_Arts = input()
hsc_s_Commerce= input()
hsc_s_Science= input()
degree_t_CommMgmt= input()
degree_t_Others= input()
degree_t_SciTecg= input()
workex_No= input()
Work_Yes= input()
spcs_Mkt= input()
spcs_HR= input()
#for single prediction 
new_prediction = classifier.predict((np.array([[ssc_p, hsc_p, degree_p, etest_p, mba_p, gender_F, gender_M, ssc_b_Central, ssc_b_Others, hsc_b_central, hsc_b_Others,  hsc_s_Arts, hsc_s_Commerce, hsc_s_Science, degree_t_CommMgmt, degree_t_Others, degree_t_SciTecg, workex_No, Work_Yes, spcs_Mkt, spcs_HR]])))
new_prediction = (new_prediction > 0.5)

#y_pred = (y_pred >= 0.5)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)