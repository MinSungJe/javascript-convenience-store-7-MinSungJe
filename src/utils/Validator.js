import {
  INPUT_SPLITER,
  ITEM_FORMAT_REGEXP,
  UserAnswer,
} from '../constant/config.js';
import { Errors } from '../constant/messages.js';

const Validator = {
  checkCanBuy(productQuantity, amount) {
    if (productQuantity < amount) {
      throwError(Errors.MORE_THAN_INVENTORY);
    }
  },

  checkReadItemInput(input, inventory) {
    const items = input.split(INPUT_SPLITER);
    items.map((item) => {
      if (!ITEM_FORMAT_REGEXP.test(item)) throwError(Errors.INVAILD_FORMAT);
      this.checkItemDetail(item, inventory);
    });
  },

  checkItemDetail(item, inventory) {
    const [_, name, amount] = item.match(ITEM_FORMAT_REGEXP);
    if (inventory.getAllProductsInfo(name).length === 0)
      throwError(Errors.NO_PRODUCT_IN_INVENTORY);
    this.checkCanBuy(inventory.getAllProductsQuantity(name), Number(amount));
  },

  checkYesOrNo(input) {
    if (!(input === UserAnswer.YES || input === UserAnswer.NO))
      throwError(Errors.WRONG_INPUT);
  },
};

const throwError = (message) => {
  throw new Error(`${Errors.PREFIX} ${message}`);
};

export default Validator;
