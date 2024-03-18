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

  constructor(shippingAddress) {
    this.items = [];
    this.shippingAddress = shippingAddress;
  }

  addItem(product, quantity) {
    const item = new Item(product, quantity);
    this.items.push(item);
  }

  get totalIncludingShipping() {
    const totalItemsCost = this.items.reduce((total, { product, quantity }) => {
      const { price } = product;
      const itemAggregateCost = price * quantity;

      return total + itemAggregateCost;
    }, 0);

    return totalItemsCost;
  }
}
