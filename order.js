class Item {
    product
    quantity
    constructor(product, quantity) {
        this.product = product
        this.quantity = quantity;
    }
}

class Order {
    items
    shippingAddress
    constructor(shippingAddress) {
        this.items = []
        this.shippingAddress = shippingAddress;
    }
}