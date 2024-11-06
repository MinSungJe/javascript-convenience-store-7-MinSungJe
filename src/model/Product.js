const PROMOTION_VALUE_REGEXP = /(\d+)\+1/;

class Product {
  name;
  price;
  quantity;
  promotion;

  constructor(name, price, quantity, promotionString = null) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = this.#getPromotionValue(promotionString);
  }

  #getPromotionValue(promotionString) {
    if (PROMOTION_VALUE_REGEXP.test(promotionString)) {
      return Number(promotionString.match(PROMOTION_VALUE_REGEXP)[1]);
    }
    return -1;
  }
}

export default Product;
