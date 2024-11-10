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
    this.printTotalSection(recipt);
  },

  printBuySection(recipt) {
    Console.print('==============W 편의점================');
    Console.print('상품명'.padEnd(15) + '수량'.padEnd(10) + '금액');
    for (const { name, amount, price } of recipt.getBuyRecipt()) {
      Console.print(
        name.padEnd(15) + amount.toString().padEnd(10) + price.toLocaleString()
      );
    }
  },

  printFreeSection(recipt) {
    Console.print('=============증	정===============');
    for (const { name, amount } of recipt.getFreeRecipt()) {
      Console.print(name.padEnd(15) + amount.toString().padEnd(10));
    }
  },

  printTotalSection(recipt) {
    Console.print('====================================');
    this.printTotalPrice(recipt);
    this.printPromotionDiscount(recipt);
    this.printMembershipDiscount(recipt);
    this.printResultPrice(recipt);
    Console.print('');
  },

  printTotalPrice(recipt) {
    Console.print(
      '총구매액'.padEnd(15) +
        recipt.getTotalAmount().toString().padEnd(10) +
        recipt.getTotal().toLocaleString()
    );
  },

  printPromotionDiscount(recipt) {
    Console.print(
      '행사할인'.padEnd(25) +
        `-${recipt.getPromotionDiscount().toLocaleString()}`
    );
  },

  printMembershipDiscount(recipt) {
    Console.print(
      '멤버십할인'.padEnd(25) +
        `-${recipt.getMembershipDiscount().toLocaleString()}`
    );
  },

  printResultPrice(recipt) {
    Console.print(
      '내실돈'.padEnd(25) + `${recipt.getResult().toLocaleString()}`
    );
  },
};

export default OutputView;
