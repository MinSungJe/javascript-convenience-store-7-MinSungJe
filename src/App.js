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
      await this.getFreeMoreInput(name, amount);
      await this.askNotPromotionInput(name, amount);
    }
    await this.memberShipInput(recipt);

    return recipt;
  }

  async getFreeMoreInput(name, amount) {
    const freeAmount = this.promotionCalculator.getCanFreeMore(name, amount);
    let userInput = 'N';
    if (freeAmount > 0)
      userInput = await loopWhileValid(InputView.getFreeMore, name, freeAmount);
    this.processGetFreeMoreInput(userInput);
  }

  processGetFreeMoreInput(userInput) {
    if (userInput === 'Y') {
    }
    if (userInput === 'N') {
    }
  }

  async askNotPromotionInput(name, amount) {
    const basicAmount = this.promotionCalculator.getBasicAmount(name, amount);
    let userInput = 'Y';
    if (this.promotionCalculator.getPromotionProductQuantity(name) < amount)
      userInput = await loopWhileValid(
        InputView.askNotPromotion,
        name,
        basicAmount
      );
    this.processNotPromotionInput(userInput);
  }

  processNotPromotionInput(userInput) {
    if (userInput === 'Y') {
    }
    if (userInput === 'N') {
    }
  }

  async memberShipInput(recipt) {
    const userInput = await loopWhileValid(InputView.getMembership);
    if (userInput === 'Y') recipt.calculateMembershipDiscount();
  }

  async askToExit() {
    const restartInput = await loopWhileValid(InputView.replay);
    if (restartInput === 'N') return true;
    return false;
  }
}

export default App;
