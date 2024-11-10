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

  printRecipt(recipt) {
    this.printBuySection(recipt);
    this.printFreeSection(recipt);
  },

  printBuySection(recipt) {
    Console.print('==============W 편의점================');
    Console.print('상품명'.padEnd(15) + '수량'.padEnd(10) + '금액');
    for (const { name, amount, price } of recipt.getBuyRecipt()) {
      Console.print(
        name.padEnd(15) + amount.toString().padEnd(10) + price.toString()
      );
    }
  },

  printFreeSection(recipt) {
    Console.print('=============증	정===============');
    for (const { name, amount, price } of recipt.getFreeRecipt()) {
      Console.print(
        name.padEnd(15) + amount.toString().padEnd(10) + price.toString()
      );
    }
  },
};

export default OutputView;
