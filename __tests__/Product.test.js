import Product from '../src/model/Product.js';

describe('상품 테스트', () => {
  const product = new Product('콜라', 1000, 10, '탄산2+1');
  test.each([
    ['name', '콜라'],
    ['price', 1000],
    ['quantity', 10],
  ])('각 상품의 %s 정보를 저장하고 %s를 출력한다.', (category, expected) => {
    // 콜라, 1000, 10, 탄산2 + 1;
    if (category === 'name') expect(product.getName()).toBe(expected);
    if (category === 'price') expect(product.getPrice()).toBe(expected);
    if (category === 'quantity') expect(product.getQuantity()).toBe(expected);
  });

  test('상품의 프로모션 정보가 없다면 Buy N Get 1 Free 정보를 읽는다.', () => {
    const product = new Product('콜라', 1000, 10, '탄산3+1');
    expect(product.getPromotion()).toBe(3);
  });

  test('상품의 프로모션 정보가 없다면 -1을 프로모션 정보로 가진다.', () => {
    const product = new Product('콜라', 1000, 10);
    expect(product.getPromotion()).toBe(-1);
  });

  test('상품의 프로모션 정보가 있지만 N+1이 없을 경우 -1을 프로모션 정보로 가진다.', () => {
    const product = new Product('콜라', 1000, 10, '특별할인!');
    expect(product.getPromotion()).toBe(-1);
  });
});
