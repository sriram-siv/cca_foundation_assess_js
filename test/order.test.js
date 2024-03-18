import { describe, expect, it, vi } from "vitest";
import { Product, Warehouse } from "../warehouse";
import { Order } from "../order";
import Country from "../countries";

vi.mock("../shipping.js", async () => {
  const { calculateShipping } = await vi.importActual("../shipping.js");

  return {
    calculateShipping,
    getCountryRegion: () => new Promise((res) => res("OTHER")),
  };
});

describe("order", () => {
  it("should add an item to the order with a specified quantity", () => {
    const warehouse = new Warehouse();
    const product = new Product("test", "Test Product", 100);
    const order = new Order(Country.UNITED_KINGDOM, warehouse);

    warehouse.receiveStock(product, 1000);
    order.addItem(product, 25);

    expect(order.items).toEqual([{ product, quantity: 25 }]);
  });

  it("should throw an error when there is not enough stock for adding an item to the order", () => {
    const warehouse = new Warehouse();
    const product = new Product("test", "Test Product", 100);
    const order = new Order(Country.UNITED_KINGDOM, warehouse);

    warehouse.receiveStock(product, 10);

    expect(() => order.addItem(product, 25)).toThrow();
  });

  it.each(
    Array.from({ length: 1000 }, () => [
      Math.ceil(Math.random() * 100),
      Math.ceil(Math.random() * 10),
    ])
  )(
    "should calculate the correct total for the order with shipping when item price is %i and quantity is %i",
    async (price, quantity) => {
      const warehouse = new Warehouse();
      const product = new Product("test", "Test Product", price);
      const order = new Order(Country.UNITED_KINGDOM, warehouse);

      warehouse.receiveStock(product, quantity);
      order.addItem(product, quantity);

      const totalIncludingShipping = await order.totalIncludingShipping();

      expect(totalIncludingShipping).toBe(price * quantity + 9.99);
    }
  );

  it("should adjust the stock in the inventory when completing an order", () => {
    const warehouse = new Warehouse();
    const productA = new Product("a", "Test Product A", 10);
    const productB = new Product("b", "Test Product B", 10);
    const productC = new Product("c", "Test Product C", 10);
    const order = new Order(Country.UNITED_KINGDOM, warehouse);

    warehouse.receiveStock(productA, 100);
    warehouse.receiveStock(productB, 100);
    warehouse.receiveStock(productC, 100);

    order.addItem(productA, 25);
    order.addItem(productB, 50);
    order.addItem(productC, 100);

    order.confirm();

    expect(warehouse.checkStock(productA)).toBe(75);
    expect(warehouse.checkStock(productB)).toBe(50);
    expect(warehouse.checkStock(productC)).toBe(0);
  });
});
