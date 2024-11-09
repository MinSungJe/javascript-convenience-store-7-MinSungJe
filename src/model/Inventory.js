import Validator from '../utils/Validator.js';

class Inventory {
  #productList = [];

  add(product) {
    this.#productList.push(product);
  }

  getAllProductsInfo(productName) {
    return this.#getProductsByName(productName);
  }

  getPromotionProductInfo(productName) {
    return this.#getProductsByName(productName).find(
      (product) => product.getPromotion() !== null
    );
  }

  getBasicProductInfo(productName) {
    return this.#getProductsByName(productName).find(
      (product) => product.getPromotion() === null
    );
  }

  getPromotionProductQuantity(productName) {
    const promotionProduct = this.getPromotionProductInfo(productName);
    if (!promotionProduct) return 0;
    return promotionProduct.getQuantity();
  }

  getBasicProductQuantity(productName) {
    const basicProduct = this.getBasicProductInfo(productName);
    if (!basicProduct) return 0;
    return basicProduct.getQuantity();
  }

  #getProductsByName(productName) {
    return this.#productList.filter(
      (product) => product.getName() === productName
    );
  }

  buyPromotionProduct(productName, amount) {
    const promotionProduct = this.getPromotionProductInfo(productName);
    Validator.checkCanBuy(promotionProduct.getQuantity(), amount);
    promotionProduct.buy(amount);
  }

  buyBasicProduct(productName, amount) {
    const basicProduct = this.getBasicProductInfo(productName);
    Validator.checkCanBuy(basicProduct.getQuantity(), amount);
    basicProduct.buy(amount);
  }
}

export default Inventory;
