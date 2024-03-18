import { beforeEach, describe, expect, it, vi } from "vitest";
import { printShippingCosts } from "../main";
import Country from "../countries";

const spyConsole = vi.spyOn(console, "log");

describe("printShippingCosts", () => {
  beforeEach(() => {
    spyConsole.mockClear();
  });

  it.each([
    [
      Country.UNITED_KINGDOM,
      100.0,
      "Shipping cost to United Kingdom for order total £100 is £0",
    ],
    [
      Country.UNITED_KINGDOM,
      99.99,
      "Shipping cost to United Kingdom for order total £99.99 is £4.99",
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
      99.99,
      "Shipping cost to Albania for order total £99.99 is £9.99",
    ],
    [
      Country.ALBANIA,
      100.0,
      "Shipping cost to Albania for order total £100 is £9.99",
    ],
  ])(
    "should return results unchanged from initial outputs",
    async (country, orderTotal, output) => {
      printShippingCosts(country, orderTotal);
      await new Promise((res) => setTimeout(res, 1000));

      expect(spyConsole).toHaveBeenCalledWith(output);
    }
  );
});
