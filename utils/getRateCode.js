module.exports = (item, zipsData) => {
    //Grabs rate codes based on a provided list of zip codes.
    //Example return: { zipcode: '20047', rate: '', rateCode: '3', state: 'MO' }
    const zipsList = zipsData.filter(zip => item.zipcode == zip.zipcode);


    if (zipsList.length != 1) {
        let compareZips = zipsList.map(item => item.rate_area);
        
        //returns with empty rateCode if there is more than one rate code listed for a given zipcode.
        const equalBool = compareZips.every((val, i, arr) => val === arr[0]);
        if (!equalBool){
            return {
                ...item,
                rateCode: ""
            }
        }
    }
    return {
        ...item,
        rateCode: zipsList[0].rate_area,
        state: zipsList[0].state
    }
}