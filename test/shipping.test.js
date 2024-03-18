import { describe, expect, it } from "vitest";
import { calculateShipping } from "../shipping";

describe("calculateShipping", () => {
  it.each(Array.from({ length: 200 }, (_, i) => i + 1))(
    "should calculate the correct shipping costs for region: UK, total: %i",
    async (total) => {
      const shippingCost = await calculateShipping("UK", total);
      const expectedCost = total < 120 ? 4.99 : 0;

      expect(shippingCost).toBe(expectedCost);
    }
  );
  it.each(Array.from({ length: 200 }, (_, i) => i + 1))(
    "should calculate the correct shipping costs for region: EU, total: %i",
    async (total) => {
      const shippingCost = await calculateShipping("EU", total);
      const expectedCost = total < 100 ? 8.99 : 4.99;

      expect(shippingCost).toBe(expectedCost);
    }
  );
  it.each(Array.from({ length: 300 }, (_, i) => i + 1))(
    "should calculate the correct shipping costs for region: OTHER, total: %i",
    async (total) => {
      const shippingCost = await calculateShipping("OTHER", total);
      const expectedCost = total < 200 ? 9.99 : 5.99;

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
