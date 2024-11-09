import calculatePromotionAmount from './calculatePromotionAmount';

const calculateCanFreeMore = (
  productName,
  amount,
  inventory,
  promotionInfo
) => {
  const promotionAmount = calculatePromotionAmount(
    productName,
    amount,
    inventory,
    promotionInfo
  );
  const rest = amount % promotionAmount;
  const promotionProductQuantity =
    inventory.getPromotionProductQuantity(productName);
  const event = promotionInfo.getEvent(
    inventory.getPromotionProductInfo(productName).getPromotion()
  );

  if (
    isEnoughToPromotion(rest, event, promotionProductQuantity, promotionAmount)
  ) {
    return event.get;
  }
  return 0;
};

const isEnoughToPromotion = (
  rest,
  event,
  promotionProductQuantity,
  promotionAmount
) => {
  return (
    rest === event.buy &&
    promotionProductQuantity >= promotionAmount + rest + event.get
  );
};

export default calculateCanFreeMore;
