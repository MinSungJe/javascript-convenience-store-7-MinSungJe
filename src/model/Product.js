import { Outputs } from '../constant/messages.js';

class Product {
  #name;
  #price;
  #quantity;
  #promotion;

  constructor(name, price, quantity, promotion = null) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
    this.#promotion = promotion;
  }

  buy(amount) {
    this.#quantity -= amount;
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return this.#price;
  }

  getQuantity() {
    return this.#quantity;
  }

  getPromotion() {
    return this.#promotion;
  }

  getStringInfo() {
    let quantityString = `${this.#quantity}개`;
    if (this.#quantity === 0) quantityString = Outputs.NO_PRODUCT;

    let promotionString = this.#promotion;
    if (this.#promotion === null) promotionString = '';

    return `- ${
      this.#name
    } ${this.#price.toLocaleString()}원 ${quantityString} ${promotionString}`;
  }

  setQuantity(amount) {
    this.#quantity = amount;
  }
}

export default Product;
