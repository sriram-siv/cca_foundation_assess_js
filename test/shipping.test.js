import { describe, expect, it } from "vitest";
import { calculateShipping } from "../shipping";

describe("calculateShipping", () => {
  it.each([
    ["UK", 99.99, 4.99],
    ["UK", 100, 0],
    ["EU", 99.99, 8.99],
    ["EU", 100, 4.99],
    ["OTHER", 100, 9.99],
  ])(
    "should calculate the correct shipping costs for region: %s, total: %i",
    async (region, total, expectedCost) => {
      const shippingCost = await calculateShipping(region, total);
      expect(shippingCost).toBe(expectedCost);
    }
  );

  it.each([null, undefined, -100, 0])(
    "should throw an error when passed %s total",
    async (total) => {
      let shippingCost;

      expect(
        () => (shippingCost = calculateShipping("UK", total))
      ).toThrowError();

      expect(shippingCost).toBeUndefined();
    }
  );
});
