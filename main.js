import { calculateShipping, getCountryRegion } from "./shipping";

export async function printShippingCosts(country, orderTotal) {
  const region = await getCountryRegion(country).catch(console.error);

  try {
    const shippingCost = calculateShipping(region, orderTotal);

    console.log(
      `Shipping cost to ${country} for order total £${orderTotal} is £${shippingCost}`
    );
  } catch (error) {
    console.error(error);
  }
}
