from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import pickle as pk

api = FastAPI()

class TimeData(BaseModel):
    month: int
    day: int
    hour: int
    minute: int


def loadModel(x):
    with open(f'Data/models/{x}Predict.pkl','rb') as f:
        modelT = pk.load(f)
        return modelT


def studyScore (values):
    sc = 0
    if 20<=values['temp']<=25:
        sc += 5
    
    if 30<=values['hum']<=50:
        sc += 5
    if 300<=values['lum']<=500:
        sc += 5
    
    if 50<= values['noise']:
        sc += 5
    
    return sc


@api.post('/time')
async def time(data: TimeData):
    month = data.month
    day = data.day
    hour = data.hour
    minute = data.minute
    receivedData = pd.DataFrame([{
    'month': month,
    'day': day,
    'hour': hour,
    'minute': minute
}])
    
    values = {
        'temp':0,
        'hum':0,
        'lum':0,
        'noise':0
    }

    for i in values:
        values[i] = loadModel(i).predict(receivedData)[0]
    

    return {"StudyScore":studyScore(values), "variables":values}