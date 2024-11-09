const getMemberDiscount = (price) => {
  return Math.min(8000, price * 0.3);
};

export default getMemberDiscount;
