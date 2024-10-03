import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

temp = pd.read_csv('classroom1/Temperature.csv')
hum = pd.read_csv('classroom1/Humidity.csv')
lum = pd.read_csv('classroom1/Luminance.csv')
noise = pd.read_csv('classroom1/Noise.csv')


def process_dataframe(df):
    
    df['time_of_reading'] = pd.to_datetime(df['time_of_reading'], format="%Y-%m-%d %H:%M:%S")
    
    df['month'] = df['time_of_reading'].dt.month
    df['day'] = df['time_of_reading'].dt.day
    df['hour'] = df['time_of_reading'].dt.hour
    df['minute'] = df['time_of_reading'].dt.minute

    
    
    df.drop(['time_of_reading', 'unit', 'device_type','time_of_create'], axis=1, inplace=True)
    df = df.groupby(['month', 'day', 'hour', 'minute']).agg({'reading': 'mean'}).reset_index() #Calculate the avg of redundant values

    return df

temp = process_dataframe(temp)
hum = process_dataframe(hum)
lum = process_dataframe(lum)
noise = process_dataframe(noise)

temp.to_csv('newData/temp.csv')
hum.to_csv('newData/hum.csv')
lum.to_csv('newData/lum.csv')
noise.to_csv('newData/noise.csv')


