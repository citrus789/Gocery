from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from typing import Union

#import demo_test
import middleman
import hardCode

app = FastAPI()

class Request(BaseModel):
    keywords: Union[str,None]
    price: float
    distance: float
    rating: float

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
    


#back to front
@app.get("/give/hardCode")
def sendingData():
    #run the demo part and get a best option
    return best