const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();

app.get('/:dayId', async (req, res) => {
    const response = await axios.get('https://sks.deu.edu.tr/yemek-menusu/');
    const data = await response.data;

    const { document } = new JSDOM(data).window;
    const menu = document.querySelector('#tm_lunch_menu_widget-5').textContent.split(',');
    const days = [];

    for (let i = 1; i < menu.length; i++) {
        days.push(menu[i].slice(0, -3));
    }

    return res.json(days[req.params.dayId]);
});

app.listen(8080, () => console.log('App is running on port 8080'));
