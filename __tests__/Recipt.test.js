import Recipt from '../src/model/Recipt.js';

describe('구매 내역(영수증) 클래스 테스트', () => {
  const recipt = new Recipt();
  recipt.addBuyProduct('콜라', 3, 3000);
  recipt.addBuyProduct('에너지바', 5, 10000);
  recipt.addFreeProduct('콜라', 1, 1000);

  test('상품을 정가주고 구매한 경우 구매한 상품 정보를 담아야 한다.', () => {
    expect(recipt.getBuyRecipt()).toStrictEqual([
      {
        name: '콜라',
        amount: 3,
        price: 3000,
      },
      {
        name: '에너지바',
        amount: 5,
        price: 10000,
      },
    ]);
  });

  test('상품을 증정받은 경우 증정받은 상품 정보를 담아야 한다.', () => {
    expect(recipt.getFreeRecipt()).toStrictEqual([
      {
        name: '콜라',
        amount: 1,
        price: 1000,
      },
    ]);
  });
});
