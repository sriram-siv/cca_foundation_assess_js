import { describe, expect, it } from "vitest";
import { Warehouse } from "../warehouse";

describe("Warehouse", () => {
  it("should instantiate with an empty catalogue", () => {
    const warehouse = new Warehouse();

    expect(warehouse.productStockDictionary).toEqual({});
  });
});
