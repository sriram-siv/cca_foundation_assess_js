import { calculateShipping, getCountryRegion } from "./shipping";
import { Warehouse } from "./warehouse";

export class Item {
  product;
  quantity;

  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}

export class Order {
  items;
  shippingAddress;
  warehouse;

  constructor(shippingAddress, warehouse) {
    this.items = [];
    this.shippingAddress = shippingAddress;
    this.warehouse = warehouse;
  }

  addItem(product, quantity) {
    const productStock = this.warehouse.productStockDictionary[product.id] ?? 0;

    if (productStock < quantity) {
      throw new Error("Insufficient stock to add item to order");
    }

    const item = new Item(product, quantity);
    this.items.push(item);
  }

  async totalIncludingShipping() {
    const totalItemsCost = this.items.reduce((total, { product, quantity }) => {
      const { price } = product;
      const itemAggregateCost = price * quantity;

      return total + itemAggregateCost;
    }, 0);

    const region = await getCountryRegion(this.shippingAddress);
    const shippingCost = calculateShipping(region, totalItemsCost);

    return totalItemsCost + shippingCost;
  }
}
