import requests
from lxml import etree
import pandas as pd

# testing getting data from a website
URL = "https://weather.com/weather/today/l/40.75,-73.98"
#headers = {'Origin': 'https://www.farmboy.ca/'}
resp = requests.get(URL)
#if resp.status_code == 200:
#    data = resp.json()
#    print(data)
#print(resp.status_code)
#print(resp.text)

# Create DOM from HTML text
dom = etree.HTML(resp.text)
# Search for the temperature element and get the content
elements = dom.xpath("//div[@data-testid='wxPhrase' and contains(@class,'CurrentConditions')]")
print(elements[0].text)