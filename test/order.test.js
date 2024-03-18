import { describe, expect, it } from "vitest";
import { Product } from "../warehouse";
import { Order } from "../order";

describe("order", () => {
  const product = new Product("test", "Test Product", 100);

  it("should add an item to the order with a specified quantity", () => {
    const order = new Order("100 High Street, London");
    order.addItem(product, 25);

    expect(order.items).toEqual([{ product, quantity: 25 }]);
  });
});
