from scrapy import Spider
from scrapy.selector import Selector

#数据模型
from items import Item

class Spider(Spider):
    #实例化属性
    name = "search"
    allowed_domains = ["https://www.loblaws.ca/"]
    start_urls = [
        "https://www.loblaws.ca/",
    ]

    #爬虫方法 控制爬虫如何去爬数据
    def parse(self, response):
        #促销
        sales = Selector(response).xpath('//span[@class="product-tile"]') 
        #print sales.extract()

        # for sale in sales:
        #     #声明模型
        #     item = Item()
        #
        #     item['title'] = sale.xpath('//h3/a/text()').extract()
        #     item['imageURL'] = sale.xpath('//div[@class="hlist-list-pic"]/a/img/@data-src').extract()
        #     item['detail'] = sale.xpath('//div[@class="content-text"]/p/text()').extract()
        #     item['itemURL'] = sale.xpath('//h3/a/@href').extract()
        #     item['itemfrom'] = sale.xpath('//div[@class="list-shop"]/a/text()').extract()
        #     item['hot'] = sale.xpath('//h3/a/em/text()').extract()
        #
        #     yield item

        titles = sales.xpath('//h3/a/text()').extract()
        imageURLs = sales.xpath('//div[@class="hlist-list-pic"]/a/img/@data-src').extract()
        details = sales.xpath('//div[@class="hui-content-text"]/p/text()').extract()
        itemURLs = sales.xpath('//h3/a/@href').extract()
        itemfroms = sales.xpath('//div[@class="list-shop"]/a/text()').extract()
        hots = sales.xpath('//h3/a/em/text()').extract()

        for index in range(len(sales)):
            print "创建数据模型"
            item = HuihuiItem()

            item["title"] = titles[index]
            item["imageURL"] = imageURLs[index]
            item["detail"] = details[index]
            item["itemURL"] = itemURLs[index]
            item["itemfrom"] = itemfroms[index]
            item["hot"] = hots[index]

            yield item

        print '数据转模型完毕'