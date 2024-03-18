const calculateShipping = require("./shipping");
const Country = require("./countries");

export function printShippingCosts(country, orderTotal) {
  function callback(shipping) {
    console.log(
      `Shipping cost to ${country} for order total £${orderTotal} is £${shipping}`
    );
  }
  calculateShipping(country, orderTotal, callback);
}

printShippingCosts(Country.UNITED_KINGDOM, 99.99);
printShippingCosts(Country.UNITED_KINGDOM, 100.0);
printShippingCosts(Country.FRANCE, 99.99);
printShippingCosts(Country.FRANCE, 100.0);
printShippingCosts(Country.ALBANIA, 99.99);
printShippingCosts(Country.ALBANIA, 100.0);
