import {
  MEMBERSHIP_DISCOUNT_MAX,
  MEMBERSHIP_DISCOUNT_RATE,
} from '../constant/config.js';

const getMemberDiscount = (price) => {
  return Math.min(MEMBERSHIP_DISCOUNT_MAX, price * MEMBERSHIP_DISCOUNT_RATE);
};

export default getMemberDiscount;
