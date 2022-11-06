# from selenium import webdriver
# #实例化浏览器
# driver= webdriver.Chrome()
# driver.get ()
# driver.find_element_by_xpath('//*[@id="autocomplete-listbox-desktop-site-header-"]').send_keys('oranges')
# driver.find_element_by_xpath('//*[@id="site-layout"]/div[1]/div[3]/div/header/div[1]/div[2]/form/button').click()

from selenium import webdriver
import time

class Supermarket:
	def __init__(self):
		self.itemNames = []
		self.itemPrices = []
		self.website = None
		self.searchbar = None
		self.searchbutton = None
		self.getname = None
		self.getprice = None
	def printItemPrice(self):
		for index in range(len(itemNames)):
			print(itemNames[index]+ ":" + itemPrices[index])

Loblaws = Supermarket()
Loblaws.website = 'https://www.loblaws.ca/'
Loblaws.searchbar = '//*[@id="autocomplete-listbox-desktop-site-header-"]'
Loblaws.searchbutton = '//*[@id="site-layout"]/div[1]/div[3]/div/header/div[1]/div[2]/form/button'
Loblaws.getname = "product-name__item--name"
Loblaws.getprice = "selling-price-list__item__price--now-price__value"
Costco = Supermarket()
Costco.website = 'https://www.loblaws.ca/'
Costco.searchbar = '//*[@id="autocomplete-listbox-desktop-site-header-"]'
Costco.searchbutton = '//*[@id="site-layout"]/div[1]/div[3]/div/header/div[1]/div[2]/form/button'
Costco.getname = "product-name__item--name"
Costco.getprice = "selling-price-list__item__price--now-price__value"

allMarkets = [Loblaws, Costco]

searchItem = 'orange'
	

PATH = "C:\Program Files (x86)\chromedriver.exe"
#实例化浏览器
driver= webdriver.Chrome()
for market in allMarkets:
	website = market.website
	driver.get (website)
	time.sleep(5)
	# Name = 'input'
	#last = driver.find_element_by_xpath('//*[@id="kw"]')
	driver.find_element("xpath", market.searchbar).send_keys(searchItem)
	driver.find_element("xpath", market.searchbutton).click();
	time.sleep(5)

	#get the value
	#driver.find_element(By.CLASS_NAME, "product-tracking")
	element = driver.find_elements_by_class_name(market.getname)
	itemNames = []
	for item in element:
		itemNames.append(item.text)
	market.itemNames = itemNames

	element = driver.find_elements_by_class_name(market.getprice)
	itemPrices = []
	for item in element:
		itemPrices.append(item.text)
	market.itemPrices = itemPrices

	if(len(itemNames) == len(itemPrices)):
		print("good!")

for market in allMarkets:
	market.printItemPrice()


# clickable = driver.find_element(By.id("clickable"));
# clickable.click()
#driver.click()
#actions.contextClick(btnElement).perform();
## hold time?
#<input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off">

