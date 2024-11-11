import Recipt from '../model/Recipt.js';
import loopWhileValid from '../utils/loopWhileValid.js';
import InputView from '../view/InputView.js';

class Purchaser {
  #inventory;
  #promotionCalculator;

  constructor(inventory, promotionCalculator) {
    this.#inventory = inventory;
    this.#promotionCalculator = promotionCalculator;
  }

  async getPurchaseRecipt(itemList) {
    const recipt = new Recipt();

    for (const { name, amount } of itemList)
      await this.#buyOneItem(name, amount, recipt);

    await this.#memberShipInput(recipt);
    this.#calculatePurchase(recipt);

    return recipt;
  }

  async #buyOneItem(name, amount, recipt) {
    let totalBuyAmount = amount;
    totalBuyAmount += await this.#getFreeMoreAmount(name, amount, recipt);
    totalBuyAmount -= await this.#getNotPromotionAmount(name, amount, recipt);
    this.#processPurchase(recipt, name, totalBuyAmount);
  }

  async #getFreeMoreAmount(name, amount, recipt) {
    const canFreeAmount = this.#promotionCalculator.getCanFreeMore(
      name,
      amount
    );

    let userInput = 'N';
    if (canFreeAmount > 0)
      userInput = await this.#getFreeMoreUserInput(name, canFreeAmount);

    return this.#processGetFreeMoreInput(userInput, name, amount, recipt);
  }

  async #getFreeMoreUserInput(name, canFreeAmount) {
    return await loopWhileValid(InputView.getFreeMore, name, canFreeAmount);
  }

  #processGetFreeMoreInput(userInput, name, amount) {
    if (userInput === 'Y')
      return this.#promotionCalculator.getCanFreeMore(name, amount);
    return 0;
  }

  async #getNotPromotionAmount(name, amount) {
    const basicAmount = this.#promotionCalculator.getBasicAmount(name, amount);
    const promotionQuantity =
      this.#promotionCalculator.getPromotionProductQuantity(name);

    let userInput = 'Y';
    if (promotionQuantity > 0 && promotionQuantity < amount)
      userInput = await this.#getNotPromotionUserInput(name, basicAmount);

    return this.#processNotPromotionInput(userInput, name, amount);
  }

  async #getNotPromotionUserInput(name, basicAmount) {
    return await loopWhileValid(InputView.askNotPromotion, name, basicAmount);
  }

  #processNotPromotionInput(userInput, name, amount) {
    if (userInput === 'N')
      return this.#promotionCalculator.getBasicAmount(name, amount);
    return 0;
  }

  async #memberShipInput(recipt) {
    const userInput = await loopWhileValid(InputView.getMembership);
    if (userInput === 'Y') recipt.calculateMembershipDiscount();
  }

  #buyProduct(productName, amount) {
    const { promotionAmountToBuy, basicAmountToBuy } = this.#getAmountsToBuy(
      productName,
      amount
    );

    if (promotionAmountToBuy !== 0)
      this.#inventory.buyPromotionProduct(productName, promotionAmountToBuy);
    if (basicAmountToBuy !== 0)
      this.#inventory.buyBasicProduct(productName, basicAmountToBuy);
  }

  #getAmountsToBuy(productName, amount) {
    const promotionAmountToBuy =
      this.#promotionCalculator.getPromotionAmountToBuy(productName, amount);
    const basicAmountToBuy = this.#promotionCalculator.getBasicAmountToBuy(
      productName,
      amount
    );

    return { promotionAmountToBuy, basicAmountToBuy };
  }

  #processPurchase(recipt, name, totalBuyAmount) {
    const { price, totalFreeAmount, totalNoPromotionPrice } =
      this.#getPurchaseInfo(name, totalBuyAmount);

    recipt.addBuyProduct(name, totalBuyAmount, price * totalBuyAmount);
    if (totalFreeAmount > 0)
      recipt.addFreeProduct(name, totalFreeAmount, price * totalFreeAmount);
    recipt.addNoPromotionPrice(totalNoPromotionPrice);

    this.#buyProduct(name, totalBuyAmount);
  }

  #getPurchaseInfo(name, totalBuyAmount) {
    const price = this.#inventory.getBasicProductInfo(name).getPrice();
    const totalFreeAmount = this.#promotionCalculator.getFreeAmount(
      name,
      totalBuyAmount
    );
    const totalNoPromotionPrice =
      price * this.#promotionCalculator.getBasicAmount(name, totalBuyAmount);

    return { price, totalFreeAmount, totalNoPromotionPrice };
  }

  #calculatePurchase(recipt) {
    recipt.calculateTotal();
    recipt.calculatePromotionDiscount();
    recipt.calculateResult();
  }
}

export default Purchaser;
