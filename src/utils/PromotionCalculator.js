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
    if (promotionProduct === undefined) return 0;
    if (!this.#promotionInfo.checkApplicable(promotionProduct.getPromotion()))
      return 0;
    return promotionProduct.getQuantity();
  }

  #getEvent(productName) {
    const promotionProduct =
      this.#inventory.getPromotionProductInfo(productName);
    if (promotionProduct === undefined) return null;
    return this.#promotionInfo.getEvent(
      this.#inventory.getPromotionProductInfo(productName).getPromotion()
    );
  }

  getPromotionAmount(productName, amount) {
    const promotionProductQuantity =
      this.getPromotionProductQuantity(productName);
    if (promotionProductQuantity === 0) return 0;

    const unit = this.#getUnit(productName);
    const limit = Math.min(promotionProductQuantity, amount);

    return limit - (limit % unit);
  }

  getBasicAmount(productName, amount) {
    return amount - this.getPromotionAmount(productName, amount);
  }

  getCanFreeMore(productName, amount) {
    const promotionProduct =
      this.#inventory.getPromotionProductInfo(productName);
    if (promotionProduct === undefined) return 0;
    const event = this.#getEvent(productName);

    if (this.#isEnoughToPromotion(productName, amount, event)) {
      return event.get;
    }
    return 0;
  }

  getFreeAmount(productName, amount) {
    const event = this.#getEvent(productName);
    const unit = event.buy + event.get;
    return (this.getPromotionAmount(productName, amount) / unit) * event.get;
  }

  #getUnit(productName) {
    const event = this.#getEvent(productName);
    return event.buy + event.get;
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
