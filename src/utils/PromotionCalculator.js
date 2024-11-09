class PromotionCalculator {
  #inventory;
  #promotionInfo;

  constructor(inventory, promotionInfo) {
    this.#inventory = inventory;
    this.#promotionInfo = promotionInfo;
  }

  #getPromotionProductQuantity(productName) {
    return this.#inventory.getPromotionProductQuantity(productName);
  }

  #getEvent(productName) {
    return this.#promotionInfo.getEvent(
      this.#inventory.getPromotionProductInfo(productName).getPromotion()
    );
  }

  getPromotionAmount(productName, amount) {
    const promotionProductQuantity =
      this.#getPromotionProductQuantity(productName);
    const event = this.#getEvent(productName);

    const unit = event.get + event.buy;
    const limit = Math.min(promotionProductQuantity, amount);

    return limit - (limit % unit);
  }

  getbasicAmount(productName, amount) {
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
      this.#getPromotionProductQuantity(productName);
    const promotionAmount = this.getPromotionAmount(productName, amount);
    const rest = amount % promotionAmount;

    return (
      rest === event.buy &&
      promotionProductQuantity >= promotionAmount + rest + event.get
    );
  }
}

export default PromotionCalculator;
