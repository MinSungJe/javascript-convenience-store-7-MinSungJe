import { Console } from '@woowacourse/mission-utils';
import Validator from '../utils/Validator.js';
import OutputView from './OutputView.js';
import { Inputs } from '../constant/messages.js';

const InputView = {
  async readItem(inventory) {
    const input = await Console.readLineAsync(Inputs.READ_ITEM);
    Validator.checkReadItemInput(input, inventory);
    OutputView.printBlankLine();
    return input;
  },

  async askNotPromotion(productName, amount) {
    const input = await Console.readLineAsync(
      `현재 ${productName} ${amount}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`
    );
    Validator.checkYesOrNo(input);
    OutputView.printBlankLine();
    return input;
  },

  async getFreeMore(productName, amount) {
    const input = await Console.readLineAsync(
      `현재 ${productName}은(는) ${amount}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`
    );
    Validator.checkYesOrNo(input);
    OutputView.printBlankLine();
    return input;
  },

  async getMembership() {
    const input = await Console.readLineAsync(Inputs.GET_MEMBERSHIP);
    Validator.checkYesOrNo(input);
    OutputView.printBlankLine();
    return input;
  },

  async replay() {
    const input = await Console.readLineAsync(Inputs.REPLAY);
    Validator.checkYesOrNo(input);
    OutputView.printBlankLine();
    return input;
  },
};

export default InputView;
