# from selenium import webdriver
# #实例化浏览器
# driver= webdriver.Chrome()
# driver.get ()
# driver.find_element_by_xpath('//*[@id="autocomplete-listbox-desktop-site-header-"]').send_keys('oranges')
# driver.find_element_by_xpath('//*[@id="site-layout"]/div[1]/div[3]/div/header/div[1]/div[2]/form/button').click()

from selenium import webdriver
import time
PATH = "C:\Program Files (x86)\chromedriver.exe"
#实例化浏览器
driver= webdriver.Chrome()
driver.get ('https://www.loblaws.ca/')
time.sleep(5)
# Name = 'input'
#last = driver.find_element_by_xpath('//*[@id="kw"]')
driver.find_element("xpath", '//*[@id="autocomplete-listbox-desktop-site-header-"]').send_keys('oranges')
driver.find_element("xpath", '//*[@id="site-layout"]/div[1]/div[3]/div/header/div[1]/div[2]/form/button').click();
time.sleep(5)

#get the value
#driver.find_element(By.CLASS_NAME, "product-tracking")
element = driver.find_elements_by_class_name("product-name__item--name")
itemNames = []
for item in element:
<<<<<<< HEAD
    itemNames.append(item.text)
=======
	itemNames.append(item.text)
>>>>>>> 8e96912a8a7a1d1409dbb4c81e5e4aefa4c8ca5e
print(itemNames)

element = driver.find_elements_by_class_name("selling-price-list__item__price--now-price__value")
itemPrices = []
for item in element:
<<<<<<< HEAD
    itemPrices.append(item.text)
print(itemPrices)

if(len(itemNames) == len(itemPrices)):
    print("good!")
=======
	itemPrices.append(item.text)
print(itemPrices)

if(len(itemNames) == len(itemPrices)):
	print("good!")
>>>>>>> 8e96912a8a7a1d1409dbb4c81e5e4aefa4c8ca5e


# clickable = driver.find_element(By.id("clickable"));
# clickable.click()
#driver.click()
#actions.contextClick(btnElement).perform();
## hold time?
#<input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off">