import json
from nltk.stem import WordNetLemmatizer
wnl = WordNetLemmatizer()
#parameters: json strings
# filters: price (all unnamed so far)
# rating
# distance
# search terms    

# individual information of each store
Loblaws = {
	'storeName':'Loblaws',
	'distance':'3.3',
	'address':'650 Dupont St, Toronto, ON M6G 4B1',
	'rating':'4'
}	
NoFrills = {'storeName':'No Frills',
	'distance':'4.9',
	'address':'243 Alberta Ave, Toronto, ON M6C 3X4',
	'rating':'3.9'
}
TandT = {'storeName':'T&T Supermarket',
	'distance':'1.0',
	'address':'297 College St, Toronto, ON M5T 1S2',
	'rating':'4.1'
}
Longos = {
	'storeName':'The Market by Longo\'s',
	'distance':'1.7',
	'address':'111 Elizabeth St, Toronto, ON M5G 1P7',
	'rating':'3.8'
}

error = {
	'name':'error',
	'pricePound':'',
	'storeName':'error',
	'distance':'',
	'address':'',
	'rating':''
}
# the stores compiled into a list
allSuperMarkets = [Loblaws, NoFrills, TandT, Longos]

# a list of dictionaries, the prices of each item in order of the supermarkets
oranges = [ 
	{ #Loblaws
		'name':'Oranges',
		'pricePound':'2.49',
		'image':"https://upload.wikimedia.org/wikipedia/commons/1/1f/Local_Orange_Variety_of_Kozan_-_Kozan_Yerli_Portakal_04.jpg"
	},
	{	# Nofrills
		'name':'Oranges',
		'pricePound':'1.99',
		'image':"https://upload.wikimedia.org/wikipedia/commons/1/1f/Local_Orange_Variety_of_Kozan_-_Kozan_Yerli_Portakal_04.jpg"

	},
	{	#T&T
		'name':'Oranges',
		'pricePound':'1.27',
		'image':"https://upload.wikimedia.org/wikipedia/commons/1/1f/Local_Orange_Variety_of_Kozan_-_Kozan_Yerli_Portakal_04.jpg"

	},
	{	#Longos
		'name':'Oranges',
		'pricePound':'1.49',
		'image':"https://upload.wikimedia.org/wikipedia/commons/1/1f/Local_Orange_Variety_of_Kozan_-_Kozan_Yerli_Portakal_04.jpg"

	}
]
apples = [
	{ #Loblaws
		'name':'Apples',
		'pricePound':'2.99',
		'image': "https://upload.wikimedia.org/wikipedia/commons/3/34/Apples_with_black_background.jpg"
	},
	{	# Nofrills
		'name':'Apples',
		'pricePound':'1.99',
		'image': "https://upload.wikimedia.org/wikipedia/commons/3/34/Apples_with_black_background.jpg"

	},
	{	#T&T
		'name':'Apples',
		'pricePound':'1.50',
		'image': "https://upload.wikimedia.org/wikipedia/commons/3/34/Apples_with_black_background.jpg"

	},
	{	#Longos
		'name':'Apples',
		'pricePound':'1.59',
		'image': "https://upload.wikimedia.org/wikipedia/commons/3/34/Apples_with_black_background.jpg"

	}
]
avacado = [ # price is per avacado
	{ #Loblaws
		'name':'Avacado',
		'pricePound':'2.49',
		'image': "https://upload.wikimedia.org/wikipedia/commons/c/c9/Avocado_Hass_-_single_and_halved.jpg"
	},
	{	# Nofrills
		'name':'Avacado',
		'pricePound':'1.99',
		'image': "https://upload.wikimedia.org/wikipedia/commons/c/c9/Avocado_Hass_-_single_and_halved.jpg"

	},
	{	#T&T
		'name':'Avacado',
		'pricePound':'1.99',
		'image': "https://upload.wikimedia.org/wikipedia/commons/c/c9/Avocado_Hass_-_single_and_halved.jpg"

	},
	{	#Longos
		'name':'Avacado',
		'pricePound':'2.99',
		'image': "https://upload.wikimedia.org/wikipedia/commons/c/c9/Avocado_Hass_-_single_and_halved.jpg"

	}
]
#the fruits compiled into a list, as well as a text list for indexing and name matching
allFruits = [oranges, apples, avacado]
allFruitsTxt = ['orange', 'apple', 'avacado']

def clean (string):
	cleaned = string.lower()
	cleaned = wnl.lemmatize(cleaned)
	return cleaned

# combines the store dict and the item dict to be used with the full information
def concatListDict (item, allSuperMarkets): 
	storesItems = [0] * len(allSuperMarkets) 
	for dictionary in range(len(allSuperMarkets)):
		storesItems[dictionary] = {**item[dictionary],**allSuperMarkets[dictionary]}
	return storesItems

# takes a list of dictionaries of all the prices at all the stores
# returns the index of the cheapest supermarket
def bestStore (storeandPrice):
	min = -1.0
	minDict = -1
	for dict in range(len(storeandPrice)):
		dictionary = storeandPrice[dict]
		if min == -1:
			min = float(dictionary['pricePound'])
			minDict = dict
		elif(min > float(dictionary['pricePound'])):
			min = float(dictionary['pricePound'])
			minDict = dict
	return minDict

# takes a list of list of dictionaries of all the prices at all the stores of the items requested
# returns the index of the most optimal store, the store that gives the cheapest 
def bestStoreMulti (storesandPrices):
	minPerStore = [0] * len(allSuperMarkets)
	#minDict = -1
	numOfItems = len(storesandPrices)
	for dict in range(len(allSuperMarkets)):
		for item in range(numOfItems):
			minPerStore[dict] = float(((storesandPrices[item])[dict])['pricePound']) + minPerStore[dict]
	#print(minPerStore)
	bestStoreIndex = minPerStore.index(min(minPerStore))
	return bestStoreIndex

# takes a json of inputs, described at top
def hardCode (inputs): 
	print(type(inputs))
	pyInputs = {}
	pyInputs['price'] = clean(inputs.price)
	pyInputs['distance'] = clean(inputs.distance)
	pyInputs['rating'] = clean(inputs.rating)
	pyInputs['keywords'] = [clean(word) for word in inputs.keywords]
	
	searchTerm = pyInputs['keywords']
	
	allTerm = pyInputs['keywords']		# checking if there are multiple search entries
	numberOfTerms = len(allTerm)
	if(numberOfTerms > 1):
		print("more than one term")
		fruitIndex = []
		while (allTerm[0] in allFruitsTxt):
			fruitIndex.append(allFruitsTxt.index(allTerm[0]))
			allTerm.pop(0)		# getting rid of the one checked
			if not allTerm: 	# list is empty
				break
		if (numberOfTerms != len(fruitIndex)): 		# one of the inputs was illegal and not found
			return error
		requestFruitInfo = []
		for index in fruitIndex:
			requestFruitInfo.append(concatListDict(allFruits[index], allSuperMarkets))
		bestIndex = bestStoreMulti(requestFruitInfo)
		bestStoreFruits = []
		counter = 0
		for index in fruitIndex:
			toadd = {**(allFruits[index])[bestIndex],**allSuperMarkets[bestIndex]}
			bestStoreFruits.append(toadd)
			counter = counter + 1
		return bestStoreFruits

	
	elif (numberOfTerms == 1 and searchTerm[0] in allFruitsTxt): 		# if only one search entry
		fruitIndex = allFruitsTxt.index(searchTerm[0])
		storeandPrice = concatListDict(allFruits[fruitIndex], allSuperMarkets)
		bestIndex = bestStore(storeandPrice)
		return [storeandPrice[bestIndex]]

	return error


inputting = {
	'keywords':'avacado apple',
	'price':'12',
	'distance': '10', 
	'rating':'3'
	
}
def tester():
	result = hardCode(json.dumps(inputting))
	print(result)
#tester()

#elif (pyInputs['terms'] == 'apple'):
#		storeandPrice = concatListDict(apples, allSuperMarkets)
#		bestIndex = bestStore(storeandPrice)
#		return storeandPrice[bestIndex]
#	elif (pyInputs['terms'] == 'avacado'):
#		storeandPrice = concatListDict(avacado, allSuperMarkets)
#		return storeandPrice[bestIndex]