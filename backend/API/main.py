from fastapi import FastAPI
from Data.dataApi import dataApi

app = FastAPI()
app.include_router(dataApi)

