const calculateShipping = require("./shipping");
const Country = require("./countries")

function printShippingCosts(country, orderTotal) {
    function callback(shipping){
        console.log(`Shipping cost to ${country} for order total £${orderTotal} is £${shipping}`);
    }
    calculateShipping(country, orderTotal, callback);
}

printShippingCosts(Country.UNITED_KINGDOM, 29.99);
printShippingCosts(Country.UNITED_KINGDOM, 30.00);
printShippingCosts(Country.FRANCE, 29.99);
printShippingCosts(Country.FRANCE, 30.00);
printShippingCosts(Country.ALBANIA, 29.99);
printShippingCosts(Country.ALBANIA, 30.00);