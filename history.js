export class SalesHistory {
  orders;
  constructor() {
    this.orders = [];
  }

  addOrder(order) {
    this.orders.push(order);
  }
}
