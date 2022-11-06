import json
from nltk.stem import WordNetLemmatizer
wnl = WordNetLemmatizer()

def cleanM (string):
	cleaned = string.lower()
	cleaned = wnl.lemmatize(cleaned)
	return cleaned

def middleman (inputs):
	pyInputs = json.loads(inputs) 		# convert to dictionary
	for key in pyInputs: 
		pyInputs[key] = cleanM(pyInputs[key])
	allTerm = pyInputs['keywords'].split()		# list of all the search terms
	return allTerm

def fixForReturn (inputList):
	returnList = []
	for itemidx in inputList:
		itemDict = {'name':(inputList[itemidx])[2], 'pricePound':(inputList[itemidx])[3], 'image':'', "storeName":(inputList[itemidx])[1],
		'distance':'0', 'address':'abcstreet', 'rating':'4.5'}
		returnList.append(itemDict)
	return returnList




#outdated format
#inputting = {
#	'price':'12', 
#	'rating':'3', 
#	'distance': '10', 
#	'terms':'avacado apple'
#}
#def tester():
	#result = middleman(json.dumps(inputting))
	#print(result)

#tester()