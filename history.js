export class SalesHistory {
  orders;
  constructor() {
    this.orders = [];
  }

  addOrder(order) {
    this.orders.push(order);
  }

  getProductHistory(product) {
    return this.orders.filter((order) =>
      order.items.some((item) => item.product.id === product.id)
    );
  }
}
