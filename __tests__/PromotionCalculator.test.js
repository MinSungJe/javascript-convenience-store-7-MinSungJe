import PromotionCalculator from '../src/utils/PromotionCalculator.js';
import Inventory from '../src/model/Inventory.js';
import Product from '../src/model/Product.js';
import PromotionInfo from '../src/model/PromotionInfo.js';

describe('프로모션 적용 컨트롤러 테스트', () => {
  const inventory = new Inventory();

  const promotionProduct = new Product('콜라', 1000, 6, '탄산2+1');
  const basicProduct = new Product('콜라', 1000, 10, null);

  inventory.add(promotionProduct);
  inventory.add(basicProduct);

  const testPromotionInfo = new PromotionInfo();
  testPromotionInfo.addEvent('탄산2+1', 2, 1, '2024-01-01', '2024-12-31');
  testPromotionInfo.addEvent('MD추천상품', 1, 1, '2022-01-01', '2023-12-31');
  testPromotionInfo.addEvent('반짝할인', 1, 1, '2024-11-01', '2024-11-30');
  const promotionCalculator = new PromotionCalculator(
    inventory,
    testPromotionInfo
  );

  test('프로모션 혜택을 받은 상품 수를 반환한다.', () => {
    expect(promotionCalculator.getPromotionAmount('콜라', 5)).toBe(3);
  });

  test('프로모션 혜택을 받지 못한 상품 수를 반환한다.', () => {
    expect(promotionCalculator.getBasicAmount('콜라', 5)).toBe(2);
  });

  test('프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 추가로 가져올 수 있는 수량을 반환한다.', () => {
    expect(promotionCalculator.getCanFreeMore('콜라', 5)).toBe(1);
  });
});
