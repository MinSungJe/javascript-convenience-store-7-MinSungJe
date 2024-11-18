import Validator from '../utils/Validator.js';
import Product from './Product.js';

class Inventory {
  #productList = [];

  add(product) {
    if (product.getPromotion() !== null) {
      this.#addEmptyBasicProduct(product);
      return;
    }

    const basicProductInfo = this.getBasicProductInfo(product.getName());
    if (basicProductInfo === undefined) this.#productList.push(product);
    else this.#updateBasicProductInfo(product.getName(), product.getQuantity());
  }

  #addEmptyBasicProduct(product) {
    this.#productList.push(product);
    this.#productList.push(
      new Product(product.getName(), product.getPrice(), 0, null)
    );
  }

  #updateBasicProductInfo(productName, amount) {
    this.getBasicProductInfo(productName).setQuantity(amount);
  }

  getProductList() {
    return this.#productList;
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

  getAllProductsQuantity(productName) {
    return (
      this.getPromotionProductQuantity(productName) +
      this.getBasicProductQuantity(productName)
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
