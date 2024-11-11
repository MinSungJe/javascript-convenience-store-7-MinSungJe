import { UserAnswer } from './config.js';

export const Inputs = Object.freeze({
  READ_ITEM:
    '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
  GET_MEMBERSHIP: `멤버십 할인을 받으시겠습니까? (${UserAnswer.YES}/${UserAnswer.NO})\n`,
  REPLAY: `감사합니다. 구매하고 싶은 다른 상품이 있나요? (${UserAnswer.YES}/${UserAnswer.NO})\n`,
});

export const Outputs = Object.freeze({
  WELCOME: '안녕하세요. W편의점입니다.',
  CURRENT_INVENTORY: '현재 보유하고 있는 상품입니다.',
  NO_PRODUCT: '재고 없음',

  BUY_TITLE: '==============W 편의점================',
  FREE_TITLE: '=============증	정===============',
  TOTAL_TITLE: '====================================',

  PRODUCT_NAME: '상품명',
  PRODUCT_AMOUNT: '수량',
  PRODUCT_PRICE: '금액',
  TOTAL_PRICE: '총구매액',
  PROMOTION_DISCOUNT: '행사할인',
  MEMBERSHIP_DISCOUNT: '멤버십할인',
  RESULT_PRICE: '내실돈',
});

export const Errors = Object.freeze({
  PREFIX: '[ERROR]',
  INVAILD_FORMAT: '올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
  NO_PRODUCT_IN_INVENTORY: '존재하지 않는 상품입니다. 다시 입력해 주세요.',
  MORE_THAN_INVENTORY:
    '재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
  WRONG_INPUT: '잘못된 입력입니다. 다시 입력해 주세요.',
});
