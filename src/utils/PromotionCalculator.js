class PromotionCalculator {
  #inventory;
  #promotionInfo;

  constructor(inventory, promotionInfo) {
    this.#inventory = inventory;
    this.#promotionInfo = promotionInfo;
  }

  getPromotionProductQuantity(productName) {
    const promotionProduct =
      this.#inventory.getPromotionProductInfo(productName);
    if (!this.#promotionInfo.checkApplicable(promotionProduct.getPromotion()))
      return 0;
    return promotionProduct.getQuantity();
  }

  #getEvent(productName) {
    return this.#promotionInfo.getEvent(
      this.#inventory.getPromotionProductInfo(productName).getPromotion()
    );
  }

  getPromotionAmount(productName, amount) {
    const promotionProductQuantity =
      this.getPromotionProductQuantity(productName);
    const event = this.#getEvent(productName);

    const unit = event.get + event.buy;
    const limit = Math.min(promotionProductQuantity, amount);

    return limit - (limit % unit);
  }

  getBasicAmount(productName, amount) {
    return amount - this.getPromotionAmount(productName, amount);
  }

  getCanFreeMore(productName, amount) {
    const event = this.#getEvent(productName);

    if (this.#isEnoughToPromotion(productName, amount, event)) {
      return event.get;
    }
    return 0;
  }

  #isEnoughToPromotion(productName, amount, event) {
    const promotionProductQuantity =
      this.getPromotionProductQuantity(productName);
    const promotionAmount = this.getPromotionAmount(productName, amount);
    const rest = amount - promotionAmount;

    return (
      rest === event.buy &&
      promotionProductQuantity >= promotionAmount + rest + event.get
    );
  }
}

export default PromotionCalculator;
