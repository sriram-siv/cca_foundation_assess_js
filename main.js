const calculateShipping = require("./shipping");

export function printShippingCosts(country, orderTotal) {
  function callback(shipping) {
    console.log(
      `Shipping cost to ${country} for order total £${orderTotal} is £${shipping}`
    );
  }
  calculateShipping(country, orderTotal, callback);
}
