const calculatePromotionAmount = (
  productName,
  amount,
  inventory,
  promotionInfo
) => {
  const promotionProductQuantity =
    inventory.getPromotionProductQuantity(productName);
  const event = promotionInfo.getEvent(
    inventory.getPromotionProductInfo(productName).getPromotion()
  );

  const unit = event.get + event.buy;
  const limit = Math.min(promotionProductQuantity, amount);

  return limit - (limit % unit);
};

export default calculatePromotionAmount;
