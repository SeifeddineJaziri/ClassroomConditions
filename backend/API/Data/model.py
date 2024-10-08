import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import pickle as pk
import numpy as np

#After plotting both temp and humidity we realised that the best ML algorithm to use is linear regression


def linear(x):
    df = pd.read_csv(f'ClassroomConditions/backend/API/Data/newData/{x}.csv')
    print(x+":")
    X = df[['month', 'day', 'hour', 'minute']]
    y = df['reading']

    scoreM = 0
    for i in range(1000):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        model = LinearRegression()

        model.fit(X_train, y_train)
        score = model.score(X_test,y_test)
        if score>scoreM:
            scoreM = score
            print(scoreM)


    with open(f'ClassroomConditions/backend/API/Data/models/{x}Predict.pkl', 'wb') as model_file:
        pk.dump(model, model_file)


"""After plotting both noise and luminance we realised that the best ML algorithm to use is RandomForestRegression since
the data is not linear and is kind of random
"""

def randomF(x):
    df = pd.read_csv(f'ClassroomConditions/backend/API/Data/newData/{x}.csv')
    print(x+":")
    X = df[['month', 'day', 'hour', 'minute']]
    y = df['reading']

    scoreT = 0
    for i in range(1000):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        model = RandomForestRegressor(n_estimators=100, random_state=0) # we chose to have 100 decision trees for enhancing the accuracy

        model.fit(X_train, y_train)
        score = model.score(X_test,y_test)
        if score>scoreT:
            scoreT = score
            print(scoreT)


    with open(f'ClassroomConditions/backend/API/Data/models/{x}Predict.pkl', 'wb') as model_file:
        pk.dump(model, model_file)



linear('temp')
linear('hum')
randomF('noise')
randomF('lum')

