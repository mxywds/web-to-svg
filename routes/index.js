const express = require('express');
const puppeteer = require("puppeteer");
const sharp = require("sharp");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

const captureScreenshot = async ({url, type, width, height, quality}) => {
    const parsedWidth = parseInt(width, 10) || 1920;
    const parsedHeight = parseInt(height, 10) || 1080;
    const parsedQuality = parseInt(quality, 10) || 10;
    const imageType = type || 'jpg';

    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: 'networkidle2'});

    const fullPageHeight = await page.evaluate(() => {
        return document.documentElement.scrollHeight;
    });

    await page.setViewport({width: parsedWidth, height: fullPageHeight});

    const screenshotBuffer = await page.screenshot({fullPage: true});

    await browser.close();

    let imageBuffer;
    if (imageType === 'png') {
        imageBuffer = await sharp(screenshotBuffer)
            .png({quality: parsedQuality})
            .toBuffer();
        return {buffer: imageBuffer, contentType: 'image/png'};
    }
    if (imageType === 'svg') {
        imageBuffer = await sharp(screenshotBuffer)
            .jpeg({quality: parsedQuality})
            .toBuffer();
        const base64Image = imageBuffer.toString('base64');
        const svgImage = `<svg xmlns="http://www.w3.org/2000/svg" width="${parsedWidth}" 
height="${parsedHeight}"><image href="data:image/png;base64,${base64Image}" 
width="${parsedWidth}" height="${parsedHeight}"/></svg>`;
        return {buffer: Buffer.from(svgImage), contentType: 'image/svg+xml'};
    }
    if (imageType === 'jpg' || imageType === 'jpeg') {
        imageBuffer = await sharp(screenshotBuffer)
            .jpeg({quality: parsedQuality})
            .toBuffer();
        return {buffer: imageBuffer, contentType: 'image/jpeg'};
    }

    throw new Error('Unsupported image type');
};

router.get('/screenshot', async (req, res) => {
    const {url, width, height, quality, type} = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const {buffer, contentType} = await captureScreenshot({url, type, width, height, quality});
        res.setHeader('Content-Type', contentType);
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while taking the screenshot');
    }
});


router.get('/screenshot/*', async (req, res) => {
    const {width, height, quality} = req.query;
    const targetUrlWithType = req.params[0]; // 使用通配符*捕获剩余的URL

    const regex = /^(.*?)(?:\.(jpg|jpeg|png|svg))?$/i;
    const match = targetUrlWithType.match(regex);

    if (!match) {
        return res.status(400).send('Invalid URL format');
    }

    const url = decodeURIComponent(match[1]);
    const type = match[2] || req.query.type; // 如果没有通过扩展名指定类型，则使用 query string 中的类型

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const {buffer, contentType} = await captureScreenshot({url, type, width, height, quality});
        res.setHeader('Content-Type', contentType);
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while taking the screenshot');
    }
});


// 处理 /screenshot.<type>?url=<url> 格式的路由
router.get('/screenshot.:type', async (req, res) => {
    const {url, width, height, quality} = req.query;
    const {type} = req.params;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const {buffer, contentType} = await captureScreenshot({url, type, width, height, quality});
        res.setHeader('Content-Type', contentType);
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while taking the screenshot');
    }
});

module.exports = router;
