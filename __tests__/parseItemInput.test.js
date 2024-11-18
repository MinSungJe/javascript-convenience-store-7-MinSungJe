import parseItemInput from '../src/utils/parseItemInput.js';

describe('구매할 상품, 수량 분석하는 함수 테스트', () => {
  test('구매할 상품, 수량 Input을 리스트 형태로 반환한다.', () => {
    expect(parseItemInput('[콜라-10],[사이다-3]')).toStrictEqual([
      { name: '콜라', amount: 10 },
      { name: '사이다', amount: 3 },
    ]);
  });
});
