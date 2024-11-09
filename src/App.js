import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import loopWhileValid from './utils/loopWhileValid.js';
import loadFromPublic from './utils/loadFromPublic.js';
import parseItemInput from './utils/parseItemInput.js';
import PromotionCalculator from './utils/PromotionCalculator.js';

class App {
  async run() {
    const { inventory, promotionInfo } = loadFromPublic();

    while (true) {
      OutputView.printMessage('안녕하세요. W편의점입니다.');
      OutputView.printProducts(inventory);

      const itemInput = await loopWhileValid(InputView.readItem, inventory);
      const itemList = parseItemInput(itemInput);

      const promotionCalculator = new PromotionCalculator(
        inventory,
        promotionInfo
      );

      for (const { name, amount } of itemList) {
        const basicAmount = promotionCalculator.getBasicAmount(name, amount);

        if (
          promotionCalculator.getPromotionProductQuantity(name) > 0 &&
          basicAmount > 0
        ) {
          await loopWhileValid(InputView.askNotPromotion, name, basicAmount);
        }
      }

      const restartInput = await loopWhileValid(InputView.replay);
      if (restartInput === 'N') break;
    }
  }
}

export default App;
