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

  getTotal() {
    return this.#history.total;
  }

  getTotalAmount() {
    return this.#history.buy.reduce((acc, product) => acc + product.amount, 0);
  }

  getPromotionDiscount() {
    return this.#history.promotionDiscount;
  }

  getMembershipDiscount() {
    return this.#history.membershipDiscount;
  }

  getResult() {
    return this.#history.result;
  }

  calculateTotal() {
    this.#history.total = this.#history.buy.reduce(
      (acc, product) => acc + product.price,
      0
    );
  }

  calculatePromotionDiscount() {
    this.#history.promotionDiscount = this.#history.free.reduce(
      (acc, product) => acc + product.price,
      0
    );
  }

  calculateMembershipDiscount() {
    this.#history.membershipDiscount = this.#history.noPromotionPrice * 0.3;
  }

  calculateResult() {
    this.#history.result =
      this.#history.total -
      this.#history.promotionDiscount -
      this.#history.membershipDiscount;
  }
}

export default Recipt;
