const puppeteer = require('puppeteer')
let page;
let browser;
let browser2;



describe('Baidu', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await  browser.newPage();
        await page.goto('https://www.baidu.com');
    });


    it('Namespace: puppeteer.error', async () => {
        await expect(page.title()).resolves.toMatch('百度一下，你就知道');

    });


    test('To reconnect the browser', async () => {
        const browserWSEndpoint = browser.wsEndpoint();
        browser.disconnect()

        browser2 = await puppeteer.connect({browserWSEndpoint})

    });

    it('Class:BrowserContext', async () => {
        let context = await browser2.createIncognitoBrowserContext();
        let page2 = await context.newPage();

        await page2.goto("https://www.baidu.com")
        await context.close();

    });

    it('Class: page', async () => {
      // console.log(page.browser());
      // console.log(page.browserContext());
    });




    afterAll(async ()=>{
        browser2.close();
    })
});