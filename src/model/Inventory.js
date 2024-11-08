import Validator from '../utils/Validator';

class Inventory {
  #productList = [];

  add(product) {
    this.#productList.push(product);
  }

  getProductInfo(productName) {
    const productsByName = this.#getProductsByName(productName);
    return {
      all: productsByName,
      promotion: productsByName.find(
        (product) => product.getPromotion() !== null
      ),
      basic: productsByName.find((product) => product.getPromotion() === null),
    };
  }

  #getProductsByName(productName) {
    return this.#productList.filter(
      (product) => product.getName() === productName
    );
  }

  buyPromotionProduct(productName, amount) {
    const promotionProduct = this.getProductInfo(productName).promotion;
    Validator.checkCanBuy(promotionProduct.getQuantity(), amount);
    promotionProduct.buy(amount);
  }

  buyBasicProduct(productName, amount) {
    const basicProduct = this.getProductInfo(productName).basic;
    Validator.checkCanBuy(basicProduct.getQuantity(), amount);
    basicProduct.buy(amount);
  }
}

export default Inventory;
