const readItemRegExp = /^\[(.+)-(\d+)\]$/;

const Validator = {
  checkCanBuy(productQuantity, amount) {
    if (productQuantity < amount) {
      throwError(
        '재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
      );
    }
  },

  checkReadItemInput(input, inventory) {
    const items = input.split(',');
    items.map((item) => {
      if (!readItemRegExp.test(item))
        throwError('올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.');
      this.checkItemDetail(item, inventory);
    });
  },

  checkItemDetail(item, inventory) {
    const [_, name, amount] = item.match(readItemRegExp);
    if (inventory.getAllProductsInfo(name).length === 0)
      throwError('존재하지 않는 상품입니다. 다시 입력해 주세요.');
    if (inventory.getAllProductsQuantity(name) < Number(amount))
      throwError(
        '재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
      );
  },

  checkYesOrNo(input) {
    if (!(input === 'Y' || input === 'N'))
      throwError('잘못된 입력입니다. 다시 입력해 주세요.');
  },
};

const throwError = (message) => {
  throw new Error('[ERROR] ' + message);
};

export default Validator;
