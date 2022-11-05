import requests
 
# Lat-Lon of New York
URL = "https://www.tntsupermarket.com/eng/t-t-brand/food-essential.html"
resp = requests.get(URL)
print(resp.status_code)
print(resp.text)