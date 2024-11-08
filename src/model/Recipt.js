class Recipt {
  #history = {
    buy: [],
    free: [],
  };

  addBuyProduct(name, amount, price) {
    this.#history.buy.push({ name, amount, price });
  }

  addFreeProduct(name, amount, price) {
    this.#history.free.push({ name, amount, price });
  }

  getBuyRecipt() {
    return this.#history.buy;
  }

  getFreeRecipt() {
    return this.#history.free;
  }
}

export default Recipt;
