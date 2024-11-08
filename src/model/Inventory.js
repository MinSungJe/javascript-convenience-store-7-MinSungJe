import Validator from '../utils/Validator';

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
