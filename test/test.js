var expect = require('chai').expect;

const getRateCode = require('../utils/getRateCode');
const getRates = require('../utils/getRates');

const item = { zipcode: '20047', rate: '' } 
const zipsData = [
    { zipcode: '20047',
        state: 'MO',
        county_code: '01001',
        name: 'Autauga',
        rate_area: '3'  
    },
    { zipcode: '22112',
        state: 'MO',
        county_code: '01001',
        name: 'Autauga',
        rate_area: '14'
    },
    { zipcode: '12311',
        state: 'AL',
        county_code: '01001',
        name: 'Autauga',
        rate_area: '3'
    }
];
const itemCombined = getRateCode(item, zipsData);
const plansData = [
    { 
        plan_id: '26631YR3384683',
        state: 'MO',
        metal_level: 'Silver',
        rate: '351.6',
        rate_area: '3'
    },
    { 
        plan_id: '26631YR3384683',
        state: 'MO',
        metal_level: 'Silver',
        rate: '322.2',
        rate_area: '3'
    },
    { 
        plan_id: '26631YR3384683',
        state: 'MO',
        metal_level: 'Silver',
        rate: '100.22',
        rate_area: '3'
    },
    { 
        plan_id: '26631YR3384683',
        state: 'MO',
        metal_level: 'Silver',
        rate: '900.14',
        rate_area: '3'
    },
    { 
        plan_id: '26631YR3384683',
        state: 'TX',
        metal_level: 'Silver',
        rate: '351.6',
        rate_area: '14'
    },
    { 
        plan_id: '26631YR3384683',
        state: 'TX',
        metal_level: 'Silver',
        rate: '321.6',
        rate_area: '3'
    }
];

describe('getRateCode', () =>{
    it('should return an object', () => {
        expect(getRateCode(item, zipsData)).to.be.a('object');
    });
    it('should return a valid rate code', () => {
        expect(getRateCode(item, zipsData).rateCode).to.equal('3');
    });
    it('should return a valid state', () => {
        expect(getRateCode(item, zipsData).state).to.equal('MO');
    });
});

describe('getRates', () => {
    it('should return an object', () => {
        expect(getRates(plansData, itemCombined, zipsData)).to.be.a('object');
    });
    it('should return the SCLSP with two digits after decimal', () => {
        expect(getRates(plansData, itemCombined, zipsData).rate).to.equal('322.20');
    });
});