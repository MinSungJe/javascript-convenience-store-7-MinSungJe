import Inventory from '../src/model/Inventory.js';
import Product from '../src/model/Product.js';

describe('재고 관리 클래스 테스트', () => {
  const inventory = new Inventory();

  const promotionProduct = new Product('콜라', 1000, 5, '탄산2+1');
  const basicProduct = new Product('콜라', 1000, 10, null);

  inventory.add(promotionProduct);
  inventory.add(basicProduct);

  test('상품의 재고 정보를 확인 가능하다.', () => {
    expect(inventory.getProductInfo('콜라')).toStrictEqual({
      all: [promotionProduct, basicProduct],
      promotion: promotionProduct,
      basic: basicProduct,
    });
  });

  test('프로모션 중인 상품의 재고보다 더 많은 상품을 구매할 경우 오류를 낸다.', () => {
    expect(() => {
      inventory.buyPromotionProduct('콜라', 6);
    }).toThrow('[ERROR]');
  });

  test('프로모션 중인 상품을 구매한다.', () => {
    inventory.buyPromotionProduct('콜라', 3);
    expect(inventory.getProductInfo('콜라').promotion.getQuantity()).toBe(2);
  });

  test('프로모션 중이 아닌 상품의 재고보다 더 많은 상품을 구매할 경우 오류를 낸다.', () => {
    expect(() => {
      inventory.buyBasicProduct('콜라', 11);
    }).toThrow('[ERROR]');
  });

  test('프로모션 중이 아닌 상품을 구매한다.', () => {
    inventory.buyBasicProduct('콜라', 3);
    expect(inventory.getProductInfo('콜라').basic.getQuantity()).toBe(7);
  });
});
