import PromotionInfo from '../src/model/PromotionInfo.js';

describe('프로모션 정보 클래스 테스트', () => {
  const promotionInfo = new PromotionInfo();
  promotionInfo.addEvent('탄산2+1', 2, 1, '2024-01-01', '2024-12-31');
  promotionInfo.addEvent('MD추천상품', 1, 1, '2022-01-01', '2023-12-31');
  promotionInfo.addEvent('반짝할인', 1, 1, '2024-11-01', '2024-11-30');

  test.each([
    [
      '탄산2+1',
      {
        name: '탄산2+1',
        buy: 2,
        get: 1,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    ],
    [
      'MD추천상품',
      {
        name: 'MD추천상품',
        buy: 1,
        get: 1,
        startDate: '2022-01-01',
        endDate: '2023-12-31',
      },
    ],
    [
      '반짝할인',
      {
        name: '반짝할인',
        buy: 1,
        get: 1,
        startDate: '2024-11-01',
        endDate: '2024-11-30',
      },
    ],
  ])(
    '프로모션의 이름(%s)을 주면 정보를 받아올 수 있어야 한다.',
    (eventName, expected) => {
      expect(promotionInfo.getEvent(eventName)).toStrictEqual(expected);
    }
  );

  test('오늘 날짜가 프로모션 기간 내에 포함됐는지 확인한다.', () => {
    expect(promotionInfo.checkApplicable('반짝할인')).toBe(true);
    expect(promotionInfo.checkApplicable('MD추천상품')).toBe(false);
  });
});
