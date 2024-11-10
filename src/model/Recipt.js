class Recipt {
  #history = {
    buy: [],
    free: [],
    total: 0,
    promotionDiscount: 0,
    noPromotionPrice: 0,
    membershipDiscount: 0,
    result: 0,
  };

  addBuyProduct(name, amount, price) {
    this.#history.buy.push({ name, amount, price });
  }

  addFreeProduct(name, amount, price) {
    this.#history.free.push({ name, amount, price });
  }

  addNoPromotionPrice(price) {
    this.#history.noPromotionPrice += price;
  }

  getBuyRecipt() {
    return this.#history.buy;
  }

  getFreeRecipt() {
    return this.#history.free;
  }

  calculateMembershipDiscount() {
    this.#history.membershipDiscount = this.#history.noPromotionPrice * 0.3;
  }
}

export default Recipt;
