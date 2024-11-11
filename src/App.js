import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import loopWhileValid from './utils/loopWhileValid.js';
import loadFromPublic from './utils/loadFromPublic.js';
import parseItemInput from './utils/parseItemInput.js';
import PromotionCalculator from './utils/PromotionCalculator.js';
import Purchaser from './controller/Purchaser.js';

class App {
  #inventory;
  #purchaser;

  constructor() {
    const { inventory, promotionInfo } = loadFromPublic();
    this.#inventory = inventory;
    this.#purchaser = new Purchaser(
      this.#inventory,
      new PromotionCalculator(inventory, promotionInfo)
    );
  }

  async run() {
    while (true) {
      OutputView.printMessage('안녕하세요. W편의점입니다.');
      OutputView.printProducts(this.#inventory);

      const itemList = await this.getItemList();
      const recipt = await this.#purchaser.getPurchaseRecipt(itemList);

      OutputView.printRecipt(recipt);

      if (await this.askToExit()) break;
    }
  }

  async getItemList() {
    const itemInput = await loopWhileValid(InputView.readItem, this.#inventory);
    return parseItemInput(itemInput);
  }

  async askToExit() {
    const restartInput = await loopWhileValid(InputView.replay);
    if (restartInput === 'N') return true;
    return false;
  }
}

export default App;
