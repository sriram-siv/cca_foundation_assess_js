import { describe, expect, it } from "vitest";
import { Product, Warehouse } from "../warehouse";

describe("Warehouse", () => {
  const product = new Product("test", "Test Product", 100);

  it("should instantiate with an empty catalogue", () => {
    const warehouse = new Warehouse();

    expect(warehouse.productStockDictionary).toEqual({});
  });

  it("should be able to receive stock for a new product", () => {
    const warehouse = new Warehouse();

    warehouse.receiveStock(product, 20);

    expect(warehouse.productStockDictionary.test).toBe(20);
  });

  it("should be able to receive stock for an existing product", () => {
    const warehouse = new Warehouse();

    warehouse.receiveStock(product, 0);
    expect(warehouse.productStockDictionary.test).toBe(0);

    warehouse.receiveStock(product, 20);
    expect(warehouse.productStockDictionary.test).toBe(20);
  });

  it("should be able to adjust stock for a product", () => {
    const warehouse = new Warehouse();

    warehouse.receiveStock(product, 50);
    warehouse.adjustStock(product, 20);

    expect(warehouse.productStockDictionary.test).toBe(30);
  });

  it("should not be able to adjust stock for a product by more than its available quantity", () => {
    const warehouse = new Warehouse();

    warehouse.receiveStock(product, 50);

    expect(() => warehouse.adjustStock(product, 100)).toThrow();
  });

  it("should not be able to adjust stock for a product not in the inventory", () => {
    const warehouse = new Warehouse();

    expect(() => warehouse.adjustStock(product, 100)).toThrow();
  });

  it("should return the quantity of a product in the inventory", () => {
    const warehouse = new Warehouse();

    warehouse.receiveStock(product, 100);

    expect(warehouse.checkStock(product)).toBe(100);
  });

  it("should return the quantity of 0 for a product in the inventory", () => {
    const warehouse = new Warehouse();

    expect(warehouse.checkStock(product)).toBe(0);
  });
});

describe("Product", () => {
  it("should instantiate a product object", () => {
    const product = new Product("test", "Test Product", 100);

    expect(product).toEqual({
      id: "test",
      description: "Test Product",
      price: 100,
    });
  });
});
