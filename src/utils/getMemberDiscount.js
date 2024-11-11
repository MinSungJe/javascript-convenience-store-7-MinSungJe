import { MEMBERSHIP_DISCOUNT_RATE } from '../constant/config.js';

const getMemberDiscount = (price) => {
  return Math.min(8000, price * MEMBERSHIP_DISCOUNT_RATE);
};

export default getMemberDiscount;
