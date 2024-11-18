import Inventory from '../src/model/Inventory.js';
import loadFromPublic from '../src/utils/loadFromPublic.js';

describe('Public 폴더에서 정보 불러오는 함수 테스트', () => {
  test('loadFromPublic으로 inventory 객체를 만든다.', () => {
    expect(loadFromPublic().inventory.getPromotionProductQuantity('콜라')).toBe(
      10
    );
  });

  test('loadFromPublic으로 promotionInfo 객체를 만든다.', () => {
    expect(loadFromPublic().promotionInfo.checkApplicable('반짝할인')).toBe(
      true
    );
  });
});
