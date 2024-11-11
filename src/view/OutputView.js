import { Console } from '@woowacourse/mission-utils';
import { Outputs } from '../constant/messages.js';
import padString from '../utils/padString.js';
import { GAP_AMOUNT, GAP_PRICE } from '../constant/config.js';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printBlankLine() {
    Console.print('');
  },

  printThreeElements(firstString, secondString, thirdString) {
    Console.print(
      padString(firstString, GAP_AMOUNT) +
        padString(secondString, GAP_PRICE) +
        thirdString
    );
  },

  printTwoElements(firstString, secondString) {
    Console.print(
      padString(firstString, GAP_AMOUNT + GAP_PRICE) + secondString
    );
  },

  printProducts(inventory) {
    Console.print(Outputs.CURRENT_INVENTORY);
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
    Console.print(Outputs.BUY_TITLE);
    this.printThreeElements(
      Outputs.PRODUCT_NAME,
      Outputs.PRODUCT_AMOUNT,
      Outputs.PRODUCT_PRICE
    );
    for (const { name, amount, price } of recipt.getBuyRecipt()) {
      this.printThreeElements(name, amount.toString(), price.toLocaleString());
    }
  },

  printFreeSection(recipt) {
    Console.print(Outputs.FREE_TITLE);
    for (const { name, amount } of recipt.getFreeRecipt()) {
      Console.print(padString(name, GAP_AMOUNT) + amount.toString());
    }
  },

  printTotalSection(recipt) {
    Console.print(Outputs.TOTAL_TITLE);
    this.printTotalPrice(recipt);
    this.printPromotionDiscount(recipt);
    this.printMembershipDiscount(recipt);
    this.printResultPrice(recipt);
    Console.print('');
  },

  printTotalPrice(recipt) {
    this.printThreeElements(
      Outputs.TOTAL_PRICE,
      recipt.getTotalAmount().toString(),
      recipt.getTotal().toLocaleString()
    );
  },

  printPromotionDiscount(recipt) {
    this.printTwoElements(
      Outputs.PROMOTION_DISCOUNT,
      `-${recipt.getPromotionDiscount().toLocaleString()}`
    );
  },

  printMembershipDiscount(recipt) {
    this.printTwoElements(
      Outputs.MEMBERSHIP_DISCOUNT,
      `-${recipt.getMembershipDiscount().toLocaleString()}`
    );
  },

  printResultPrice(recipt) {
    this.printTwoElements(
      Outputs.RESULT_PRICE,
      `${recipt.getResult().toLocaleString()}`
    );
  },
};

export default OutputView;
