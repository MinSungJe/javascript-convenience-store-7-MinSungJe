import calculatePromotionAmount from './calculatePromotionAmount';

const calculateBasicAmount = (
  productName,
  amount,
  inventory,
  promotionInfo
) => {
  return (
    amount -
    calculatePromotionAmount(productName, amount, inventory, promotionInfo)
  );
};

export default calculateBasicAmount;
