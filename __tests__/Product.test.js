import Product from '../src/model/Product.js';

describe('상품 테스트', () => {
  const product = new Product('콜라', 1000, 10, '탄산2+1');
  test.each([
    ['name', '콜라'],
    ['price', 1000],
    ['quantity', 10],
    ['promotion', '탄산2+1'],
  ])('각 상품의 %s 정보를 저장하고 %s를 출력한다.', (category, expected) => {
    // 콜라, 1000, 10, 탄산2 + 1;
    if (category === 'name') expect(product.getName()).toBe(expected);
    if (category === 'price') expect(product.getPrice()).toBe(expected);
    if (category === 'quantity') expect(product.getQuantity()).toBe(expected);
    if (category === 'promotion') expect(product.getPromotion()).toBe(expected);
  });

  test('상품을 구매하면 그만큼 재고가 떨어져야 한다.', () => {
    product.buy(5);
    expect(product.getQuantity()).toBe(5);
  });
});
