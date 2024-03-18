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

  adjustStock(product, quantity) {
    const currentStock = this.productStockDictionary[product.id];

    if (currentStock === undefined) {
      throw new Error(
        "Attempting to adjust stock of product that does not exist in warehouse"
      );
    }
    if (currentStock < quantity) {
      throw new Error(
        "Attempting to adjust stock by more than available amount"
      );
    }

    this.productStockDictionary[product.id] = currentStock - quantity;
  }

  checkStock(product) {
    return this.productStockDictionary[product.id] ?? 0;
  }
}
