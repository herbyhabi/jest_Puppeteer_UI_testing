const fs = require('fs');
const puppeteer = require('puppeteer');
let browser;
let page;
const musicName = "삐삐";

/**
 * 知识点：
 * page.type 获取输入框焦点并输入文字
 * page.keyboard.press 模拟键盘按下某个按键，目前mac上组合键无效为已知bug
 * page.waitFor 页面等待，可以是时间、某个元素、某个函数
 * page.frames() 获取当前页面所有的 iframe，然后根据 iframe 的名字精确获取某个想要的 iframe
 * iframe.$('.srchsongst') 获取 iframe 中的某个元素
 * iframe.evaluate() 在浏览器中执行函数，相当于在控制台中执行函数，返回一个 Promise
 * Array.from 将类数组对象转化为对象
 * page.click() 点击一个元素
 * iframe.$eval() 相当于在 iframe 中运行 document.queryselector 获取指定元素，并将其作为第一个参数传递
 * iframe.$$eval 相当于在 iframe 中运行 document.querySelectorAll 获取指定元素数组，并将其作为第一个参数传递
 *
 */

describe('Baidu', () => {

    test("1. Open the baidu; 2. enter a keywords to search", async () => {//声明是异步函数
    browser = await (puppeteer.launch({
        headless: false,
        args: ['--start-maximized'], //浏览器窗口最大化
    }))

    page = await browser.newPage();
    page.setViewport({
        width: 1920,
        height:1080 //当前屏幕的长和宽
    })

    await page.goto("https://music.163.com/#", {
        waitUntil: 'networkidle2' //等待网络状态为空闲的时候才继续执行
    });

    //输入歌曲名称，并按回车键
    await page.type('#srch',musicName,{delay:0})
    await page.keyboard.press('Enter');

    await page.waitFor(2000);

    //获取歌曲列表的iframe, 并找到目标歌曲的元素
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    const elementOfSongName = await iframe.$('.srchsongst [title = \'삐삐 - (BBIBBI)\']');

    //获取歌曲的地址
    // const selectedSongHref = await iframe.evaluate(e => {
    //     const songList = Array.from(e.childNodes);
    //     const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\s/g, '') === '삐삐');
    //     return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
    // }, SONG_LS_SELECTOR);

    // console.log(selectedSongHref);

    await elementOfSongName.click();

    //获取这首歌曲中的iframe
    await page.waitFor(2000);
    iframe = await page.frames().find(f => f.name() === 'contentFrame');

    // 点击 展开按钮
    const unfoldButton = await iframe.$('#flag_ctrl');
    await unfoldButton.click();

    // 获取歌词
    const LYRIC_SELECTOR = await iframe.$('#lyric-content');
    const lyricCtn = await iframe.evaluate(e => {
        return e.innerText;
    }, LYRIC_SELECTOR);

    console.log(lyricCtn);

    // 写入文件
    let writerStream = fs.createWriteStream('E:\\webstromProject\\jest_Puppeteer_UI_testing\\files/Lyrics.txt');
    writerStream.write(lyricCtn, 'UTF8');
    writerStream.end();
    browser.close();





},10000);

});