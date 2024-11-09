import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printBlankLine() {
    Console.print('');
  },

  printProducts(inventory) {
    Console.print('현재 보유하고 있는 상품입니다.');
    Console.print('');
    inventory.getProductList().map((product) => {
      Console.print(product.getStringInfo());
    });
    Console.print('');
  },
};

export default OutputView;
