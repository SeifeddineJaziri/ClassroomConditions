import pandas as pd
import re
import os

#Path of datasets (will change in deployment)
PATH = r"/mnt/c/Users/kouss/Documents/Stage/ClassroomCondition/backend/API/Data"

#This function will change in deployment
def listDirectory():
    
    listDir = []
    
    for i in os.listdir(PATH):
        if re.match(r'classroom*',i):
            listDir.append(i)
    
    return listDir
    

def extractData(time,date):
    dirs = listDirectory()
    print(dirs)
    time = str(time)
    date = str(date)
    hour = time[0:2]
    month = date[5:7]
    print(hour)
    print(month)
    # Construct regex pattern
    specific_time_pattern = rf'{date[:5]}{month}-[0-9]{{2}} {hour}:[0-5][0-9]:[0-5][0-9]'
    
    
    dataMap = {}
    list_of_variables = ['Noise','Luminance','Humidity', 'Temperature']
    print(f"Dirs: {dirs}")
    for directory in dirs:
        dataMap[directory] = {}
        for variable in list_of_variables:
            file_path = f'{PATH}/{directory}/{variable}.csv'
            if os.path.exists(file_path):
                dataClass = pd.read_csv(file_path)
                dataClass['time_of_reading'] = pd.to_datetime(dataClass['time_of_reading'])
                filtered_data = dataClass[dataClass['time_of_reading'].dt.strftime('%Y-%m-%d %H:%M:%S').str.contains(specific_time_pattern)]
                filtered_data = filtered_data['reading']
                dataMap[directory][variable] = filtered_data.mean()
             
                
            else:
                print(f"File not found: {file_path}")
    
    return dataMap



def sortData(time,date):
    dataMap = extractData(time,date)
    classes = list(dataMap)
    variables = []
    for i in dataMap:
        variables.append(dataMap[i])
    print(classes)
    print(variables)

    length = len(classes)

    for i in range(length):
        for j in range(length-1):
            if abs(variables[j]['Noise']-variables[j+1]['Noise']) > 10:
                variables[j],variables[j+1] = variables[j+1],variables[j]
                classes[j],classes[j+1] = classes[j+1],classes[j]

            elif abs(variables[j]['Luminance'] - 500) > abs(variables[j+1]['Luminance']-500):
                 variables[j],variables[j+1] = variables[j+1],variables[j]
                 classes[j],classes[j+1] = classes[j+1],classes[j]

            elif abs(variables[j]['Humidity']-45) > abs(variables[j+1]['Humidity']-45):
                variables[j],variables[j+1] = variables[j+1],variables[j]
                classes[j],classes[j+1] = classes[j+1],classes[j]

            elif abs(variables[j]['Temperature']-21) > abs(variables[j+1]['Temperature']-21):
                variables[j],variables[j+1] = variables[j+1],variables[j]
                classes[j],classes[j+1] = classes[j+1],classes[j]


    sorted_items = dict()

    for i in range(length):
        sorted_items[classes[i]] = variables[i]
    
    return sorted_items

