const fs = require('fs');
const csv = require('csvtojson');
const { Parser } = require('json2csv');

const getRateCode = require('./utils/getRateCode.js');
const getRates = require('./utils/getRates.js');


//grab the csv files and parse them into JSON.
csv().fromFile('./data/plans.csv').then((plansData) => {
    csv().fromFile('./data/zips.csv').then((zipsData) => {
        csv().fromFile('./data/slcsp.csv').then((slcspData) => {
            //gets the rate code for a given zipcode 
            list = slcspData.map(item =>  getRateCode(item, zipsData));

            //gets the Second Lowest Cost Silver Plan. 
            combineRates = list.map(item => item.rate = getRates(plansData, item, zipsData));

            //parse the JSON back into csv format
            const fields = ["zipcode", "rate"];
            let slcspCsv = new Parser({ fields }).parse(combineRates);

            //remove quotes from string and output - json2csv isn't behaving nicely.
            slcspCsv = slcspCsv.replace(/['"]+/g, '');
            fs.writeFile('output.csv', slcspCsv, (err) => {
                if (err) throw err;
                console.log("Results saved to output.csv")
            })
            

        }, (err) => {
            console.error("slcsp", err);
        });
    }, (err) => {
        console.error("zips", err);
    });
}, (err) => {
    console.error("plans", err);
});


