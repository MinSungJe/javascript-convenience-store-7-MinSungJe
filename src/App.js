import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import loopWhileValid from './utils/loopWhileValid.js';
import loadFromPublic from './utils/loadFromPublic.js';
import parseItemInput from './utils/parseItemInput.js';

class App {
  async run() {
    const { inventory, promotionInfo } = loadFromPublic();

    while (true) {
      OutputView.printMessage('안녕하세요. W편의점입니다.');
      OutputView.printProducts(inventory);

      const itemInput = await loopWhileValid(InputView.readItem, inventory);
      const itemList = parseItemInput(itemInput);

      const restartInput = await loopWhileValid(InputView.replay);
      if (restartInput === 'N') break;
    }
  }
}

export default App;
