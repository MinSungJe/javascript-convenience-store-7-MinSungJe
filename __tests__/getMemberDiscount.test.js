import getMemberDiscount from '../src/utils/getMemberDiscount.js';

describe('멤버십 할인 함수 테스트', () => {
  test('멤버십 회원인 경우 금액의 30%가 할인금액이다.', () => {
    expect(getMemberDiscount(10000)).toBe(3000);
  });

  test('멤버십 할인의 최대 한도는 8,000원이다.', () => {
    expect(getMemberDiscount(30000)).toBe(8000);
  });
});
