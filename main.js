const calculateShipping = require("./shipping");

export async function printShippingCosts(country, orderTotal) {
  const shippingCost = await calculateShipping(country, orderTotal);

  console.log(
    `Shipping cost to ${country} for order total £${orderTotal} is £${shippingCost}`
  );
}
