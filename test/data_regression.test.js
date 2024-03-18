import { beforeEach, describe, expect, it, vi } from "vitest";
import { printShippingCosts } from "../main";
import Country from "../countries";

const spyConsole = vi.spyOn(console, "log");

vi.mock("../shipping.js", async () => {
  const { calculateShipping } = await vi.importActual("../shipping.js");

  const regionLookup = {
    "United Kingdom": "UK",
    France: "EU",
    Albania: "OTHER",
  };

  return {
    calculateShipping,
    getCountryRegion: (country) =>
      new Promise((res) => res(regionLookup[country])),
  };
});

describe("printShippingCosts", () => {
  beforeEach(() => {
    spyConsole.mockClear();
  });

  it.each([
    [
      Country.UNITED_KINGDOM,
      120.0,
      "Shipping cost to United Kingdom for order total £120 is £0",
    ],
    [
      Country.UNITED_KINGDOM,
      119.99,
      "Shipping cost to United Kingdom for order total £119.99 is £4.99",
    ],
    [
      Country.FRANCE,
      99.99,
      "Shipping cost to France for order total £99.99 is £8.99",
    ],
    [
      Country.FRANCE,
      100.0,
      "Shipping cost to France for order total £100 is £4.99",
    ],
    [
      Country.ALBANIA,
      199.99,
      "Shipping cost to Albania for order total £199.99 is £9.99",
    ],
    [
      Country.ALBANIA,
      200.0,
      "Shipping cost to Albania for order total £200 is £5.99",
    ],
  ])(
    "should return results unchanged from initial outputs",
    async (country, orderTotal, output) => {
      await printShippingCosts(country, orderTotal);

      expect(spyConsole).toHaveBeenCalledWith(output);
    }
  );
});
