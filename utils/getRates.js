module.exports = (plansData, item, zipsData) => {
    //Filters based on state, correct metal level, and rateCode.
    //e.g. only returns relevant plans for NY, Silver, 3.
    const plansInQuestion = plansData.filter(plan => (item.state == plan.state && item.rateCode == plan.rate_area && plan.metal_level.toLowerCase() == "silver") );
   
    let rates = plansInQuestion.map(plan => parseFloat(plan.rate).toFixed(2));
    rates = rates.sort((a, b) => a - b);
   
    const slcsp = rates[1]? rates[1] : '';
   
    return {
        zipcode: `${item.zipcode}`,
        rate: `${slcsp}`
    }
}