export class Product {
  id;
  description;
  price;
  constructor(id, description, price) {
    this.id = id;
    this.description = description;
    this.price = price;
  }
}

export class Warehouse {
  productStockDictionary;

  constructor() {
    this.productStockDictionary = {};
  }

  receiveStock(product, quantity) {
    this.productStockDictionary[product.id] ??= 0;
    this.productStockDictionary[product.id] += quantity;
  }
}
