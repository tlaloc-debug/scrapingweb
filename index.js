const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require('fs');
const got = require('got');

app.use(cors());

const getHTML = async () => {
    try {
        return await axios.get('https://airtable.com/embed/shrblOaIrbopfhihg/tblP3rhCcgjR2OO0B', {
            headers: {
                Accept: 'text/html'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    getHTML()
        .then(html => {
        const $ = cheerio.load(html.data);
        const $alldata = $("div.dataRow.leftPane");
        let resultArr = [];
        $alldata.each(function(idx, element) {
            let itemObj = {
                title : $(this).text(),
            };
            resultArr.push(itemObj);
        });
        
        return resultArr;

        // const data = ulList.filter(n => n.title);
        // return data;
    }). then((data) => res.send(data));
});

app.listen(4000, () => {
    console.log("running")
});
