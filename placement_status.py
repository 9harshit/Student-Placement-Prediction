# Classification template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Placement_Data_Full_Class.csv')
sat = []
sat = dataset["status"] 
dataset = dataset.drop("status",  axis =1)

dataset = pd.get_dummies(dataset, columns=["gender",'ssc_b',"hsc_b","hsc_s","degree_t","workex","specialisation"])

dataset = dataset.join(sat)

X = pd.DataFrame(dataset.iloc[:, :22].values)
y = pd.DataFrame(dataset.iloc[:, 22].values)

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
classifier.add(Dense(output_dim = 50, init = "uniform" , activation = 'relu' , input_dim = 22))

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
i = 0
while(i<12):
    
    i+=1

#for single prediction 
new_prediction = classifier.predict(sc.transform(np.array([[0.0, 0, 600, 1, 40, 3, 60000, 2, 1, 1, 50000]])))

y_pred = (y_pred >= 0.5)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)