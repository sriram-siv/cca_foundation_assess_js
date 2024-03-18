import { describe, expect, it } from "vitest";
import Country from "../countries";
import { SalesHistory } from "../history";
import { Product, Warehouse } from "../warehouse";
import { Order } from "../order";

describe("history", () => {
  const salesHistory = new SalesHistory();
  const warehouse = new Warehouse();
  const productA = new Product("a", "Test Product A", 10);
  const productB = new Product("b", "Test Product B", 10);
  const productC = new Product("c", "Test Product C", 10);

  warehouse.receiveStock(productA, 100);
  warehouse.receiveStock(productB, 100);
  warehouse.receiveStock(productC, 100);

  const orderA = new Order(Country.UNITED_KINGDOM, warehouse, salesHistory);
  const orderB = new Order(Country.FRANCE, warehouse, salesHistory);
  const orderC = new Order(Country.FRANCE, warehouse, salesHistory);

  orderA.addItem(productA, 25);
  orderA.addItem(productB, 25);

  orderB.addItem(productB, 25);
  orderB.addItem(productC, 25);

  orderC.addItem(productC, 25);

  orderA.confirm();
  orderB.confirm();
  orderC.confirm();

  it("should add orders to the history array", () => {
    expect(salesHistory.orders.length).toBe(3);
  });

  it("should get the order history for a product", () => {
    expect(salesHistory.getProductHistory(productB)).toEqual([orderA, orderB]);
  });

  it("should get the order history for an address", () => {
    expect(salesHistory.getAddressHistory(Country.FRANCE)).toEqual([
      orderB,
      orderC,
    ]);
  });
});
