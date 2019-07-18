const puppeteer = require('puppeteer')
var page;
var browser;
describe('Baidu', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await  browser.newPage();
        await page.goto('https://www.baidu.com');
    });

    it('should be titled "Baidu"', async () => {
        await expect(page.title()).resolves.toMatch('百度一下，你就知道');
    });

    afterAll(async ()=>{
        browser.close();
    })
});