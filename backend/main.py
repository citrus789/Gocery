from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from typing import Union
from fastapi.middleware.cors import CORSMiddleware

#import demo_test
import middleman
from hardCode import hardCode

app = FastAPI()
origins = ["http://localhost:3000",
            "http://localhost"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

class Request(BaseModel): 
    keywords: list
    price: str
    distance: str
    rating: str

best = []
searchTerms = []   

@app.get("/")
async def root():
    return {"message": "Hello World"}

#front to back
@app.post("/send")
def gettingData(item: Request):
    searchTerms = middleman(item)
    


#back to front
@app.get("/give")
def sendingData():
    #run the demo part and get a best option
    return best

#front to back
@app.post("/send/hardCode")
def gettingData(item: Request):
    best = hardCode(item)
    return best
    


#back to front
@app.get("/give/hardCode")
def sendingData():
    #run the demo part and get a best option
    return best