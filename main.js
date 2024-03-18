const calculateShipping = require("./shipping");

export async function printShippingCosts(country, orderTotal) {
  calculateShipping(country, orderTotal).then((shippingCost) =>
    console.log(
      `Shipping cost to ${country} for order total £${orderTotal} is £${shippingCost}`
    )
  );
}
