from fastapi import APIRouter,HTTPException
import pandas as pd
from datetime import datetime
from .manipulateData import sortData

dataApi = APIRouter()

@dataApi.get('/getData/{time_str}/{date_str}')
def getData(time_str:str, date_str:str):
    res = dict()
    try:
        parsed_time = datetime.strptime(time_str, "%H:%M:%S").time()
        parsed_date = datetime.strptime(date_str, "%Y-%m-%d")
        res = sortData(parsed_time,parsed_date)

    except ValueError:

        raise HTTPException(status_code=400, detail="Invalid time format. Expected format is HH:MM:SS and date format is YYYY-MM-DD")

    return res