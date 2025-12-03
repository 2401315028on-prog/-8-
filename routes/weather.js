var express = require('express');
var router = express.Router();
const request = require('request');

const OPENWEATHER_API_KEY = "Yd0af2a7ff7bf463f274f4d9a6f96fc01"; 
const CITY_NAME = 'Tokyo,JP'; // 東京の天気予報

const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${OPENWEATHER_API_KEY}&lang=ja&units=metric`;

router.get('/', async (req, res) => {
    request(API_URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            
            const cityName = data.name;
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp; // 気温 (℃)
            const iconCode = data.weather[0].icon; // 天気アイコンコード
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // アイコン画像URL


            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>OpenWeatherMap Report</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>${cityName}の現在の天気</h1>
                    <h2>${weatherDescription}</h2>
                    <p>気温: ${temperature} ℃</p>
                    <img src="${iconUrl}" alt="${weatherDescription}">
                    <hr>
                    <p>APIから取得したJSONデータ:</p>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </body>
                </html>
            `;

            res.send(htmlContent);
            
        } else if (response && response.statusCode == 401) {
            res.status(401).send('APIキーが無効です。APIキーを正しく設定したか、またはキーが有効化されるまで待機してください。');
        } else {
            res.status(500).send('APIからのデータ取得中にエラーが発生しました。');
        }
    });
});

module.exports = router;