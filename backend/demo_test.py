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

#get the value
driver.find_element("xpath", '//*[@id="odd"]/div/div/div[3]/div[1]/div/div[3]/div/div/span/span[1]')

# clickable = driver.find_element(By.id("clickable"));
# clickable.click()
#driver.click()
#actions.contextClick(btnElement).perform();
## hold time?
#<input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off">

