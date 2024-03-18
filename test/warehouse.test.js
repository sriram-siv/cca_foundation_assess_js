import { describe, expect, it } from "vitest";
import { Product, Warehouse } from "../warehouse";

describe("Warehouse", () => {
  it("should instantiate with an empty catalogue", () => {
    const warehouse = new Warehouse();

    expect(warehouse.productStockDictionary).toEqual({});
  });

  it("should be able to receive stock for a new product", () => {
    const warehouse = new Warehouse();
    const product = new Product("test", "Test Product", 100);

    warehouse.receiveStock(product, 20);

    expect(warehouse.productStockDictionary.test).toBe(20);
  });

  it("should be able to receive stock for an existing product", () => {
    const warehouse = new Warehouse();
    const product = new Product("test", "Test Product", 100);

    warehouse.receiveStock(product, 0);
    expect(warehouse.productStockDictionary.test).toBe(0);

    warehouse.receiveStock(product, 20);
    expect(warehouse.productStockDictionary.test).toBe(20);
  });
});
