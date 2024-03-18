import { describe, expect, it } from "vitest";
import { Product } from "../warehouse";
import { Order } from "../order";
import Country from "../countries";

describe("order", () => {
  it("should add an item to the order with a specified quantity", () => {
    const order = new Order(Country.UNITED_KINGDOM);
    const product = new Product("test", "Test Product", 100);
    order.addItem(product, 25);

    expect(order.items).toEqual([{ product, quantity: 25 }]);
  });

  it.each(
    Array.from({ length: 1000 }, () => [
      Math.ceil(Math.random() * 100),
      Math.ceil(Math.random() * 10),
    ])
  )(
    "should calculate the correct total for the order with shipping when item price is %i and quantity is %i",
    (price, quantity) => {
      const order = new Order(Country.UNITED_KINGDOM);
      const product = new Product("test", "Test Product", price);
      order.addItem(product, quantity);

      expect(order.totalIncludingShipping).toBe(price * quantity);
    }
  );
});
