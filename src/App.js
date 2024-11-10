import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import loopWhileValid from './utils/loopWhileValid.js';
import loadFromPublic from './utils/loadFromPublic.js';
import parseItemInput from './utils/parseItemInput.js';
import PromotionCalculator from './utils/PromotionCalculator.js';
import Recipt from './model/Recipt.js';
import InputHandler from './utils/InputHandler.js';

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

      const itemInput = await loopWhileValid(
        InputView.readItem,
        this.inventory
      );
      const itemList = parseItemInput(itemInput);
      const recipt = new Recipt();

      for (const { name, amount } of itemList) {
        const price = this.inventory.getBasicProductInfo(name).getPrice();
        const basicAmount = this.promotionCalculator.getBasicAmount(
          name,
          amount
        );
        const freeAmount = this.promotionCalculator.getCanFreeMore(
          name,
          amount
        );

        const freeMoreInput = await InputHandler.getFreeMoreInput(
          name,
          freeAmount
        );
        const notPromotionInput = await InputHandler.askNotPromotionInput(
          name,
          amount,
          basicAmount,
          this.promotionCalculator
        );
      }

      await InputHandler.memberShipInput(recipt);

      OutputView.printRecipt(recipt);

      const restartInput = await loopWhileValid(InputView.replay);
      if (restartInput === 'N') break;
    }
  }
}

export default App;
