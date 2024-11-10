import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import loopWhileValid from './utils/loopWhileValid.js';
import loadFromPublic from './utils/loadFromPublic.js';
import parseItemInput from './utils/parseItemInput.js';
import PromotionCalculator from './utils/PromotionCalculator.js';
import Recipt from './model/Recipt.js';

class App {
  constructor() {
    const { inventory, promotionInfo } = loadFromPublic();
    this.inventory = inventory;
    this.promotionInfo = promotionInfo;
    this.promotionCalculator = new PromotionCalculator(
      inventory,
      promotionInfo
    );
  }

  async run() {
    while (true) {
      OutputView.printMessage('안녕하세요. W편의점입니다.');
      OutputView.printProducts(this.inventory);

      const itemList = await this.getItemList();
      const recipt = await this.getPurchaseRecipt(itemList);

      OutputView.printRecipt(recipt);

      if (await this.askToExit()) break;
    }
  }

  async getItemList() {
    const itemInput = await loopWhileValid(InputView.readItem, this.inventory);
    return parseItemInput(itemInput);
  }

  async getPurchaseRecipt(itemList) {
    const recipt = new Recipt();

    for (const { name, amount } of itemList) {
      let totalBuyAmount = amount;
      totalBuyAmount = await this.getFreeMoreInput(name, amount, recipt);
      totalBuyAmount = await this.askNotPromotionInput(name, amount, recipt);
      this.processPurchase(recipt, name, totalBuyAmount);
    }
    await this.memberShipInput(recipt);
    this.calculatePurchase(recipt);

    return recipt;
  }

  async getFreeMoreInput(name, amount, recipt) {
    const canFreeAmount = this.promotionCalculator.getCanFreeMore(name, amount);
    let userInput = 'N';
    if (canFreeAmount > 0)
      userInput = await loopWhileValid(
        InputView.getFreeMore,
        name,
        canFreeAmount
      );
    return this.processGetFreeMoreInput(userInput, name, amount, recipt);
  }

  processGetFreeMoreInput(userInput, name, amount, recipt) {
    let totalBuyAmount = amount;
    if (userInput === 'Y')
      totalBuyAmount += this.promotionCalculator.getCanFreeMore(name, amount);

    return totalBuyAmount;
  }

  async askNotPromotionInput(name, amount, recipt) {
    const basicAmount = this.promotionCalculator.getBasicAmount(name, amount);
    let userInput = 'Y';
    const promotionQuantity =
      this.promotionCalculator.getPromotionProductQuantity(name);
    if (promotionQuantity > 0 && promotionQuantity < amount)
      userInput = await loopWhileValid(
        InputView.askNotPromotion,
        name,
        basicAmount
      );
    return this.processNotPromotionInput(userInput, name, amount);
  }

  processNotPromotionInput(userInput, name, amount) {
    let totalBuyAmount = amount;
    if (userInput === 'N')
      totalBuyAmount -= this.promotionCalculator.getBasicAmount(name, amount);

    return totalBuyAmount;
  }

  async memberShipInput(recipt) {
    const userInput = await loopWhileValid(InputView.getMembership);
    if (userInput === 'Y') recipt.calculateMembershipDiscount();
  }

  processPurchase(recipt, name, totalBuyAmount) {
    const price = this.inventory.getBasicProductInfo(name).getPrice();
    const totalFreeAmount = this.promotionCalculator.getFreeAmount(
      name,
      totalBuyAmount
    );
    const totalNoPromotionPrice =
      price * this.promotionCalculator.getBasicAmount(name, totalBuyAmount);
    recipt.addBuyProduct(name, totalBuyAmount, price * totalBuyAmount);
    if (totalFreeAmount > 0)
      recipt.addFreeProduct(name, totalFreeAmount, price * totalFreeAmount);
    recipt.addNoPromotionPrice(totalNoPromotionPrice);
  }

  calculatePurchase(recipt) {
    recipt.calculateTotal();
    recipt.calculatePromotionDiscount();
    recipt.calculateResult();
  }

  async askToExit() {
    const restartInput = await loopWhileValid(InputView.replay);
    if (restartInput === 'N') return true;
    return false;
  }
}

export default App;
