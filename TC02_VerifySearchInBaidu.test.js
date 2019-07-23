const puppeteer = require('puppeteer')
let  browser;
let page;

beforeAll(async ()=>{
        browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors:true,slowMo:250,timeout:0});
        page = await browser.newPage();
        await page.setJavaScriptEnabled(true)
})


afterAll(async ()=>{
        await browser.close();
})


test("1. Open the baidu; 2. enter a keywords to search", async () => {//声明是异步函数

        await page.goto("https://www.baidu.com", {
                waitUntil: 'networkidle2' //等待网络状态为空闲的时候才继续执行

        });

        //添加assertion，验证百度的标题是否正确
        const pageTitle = await page.title();
        await expect(pageTitle).toMatch('百度一下，你就知道')

        // const inputOfSearch = await page.$('#s_kw_wrap>#kw')

        await page.focus('#kw');
        await page.keyboard.type("Jest");




    }, 10000) //设置timeout时间为10000s，如果不设置，会报timeout error， 默认是5s