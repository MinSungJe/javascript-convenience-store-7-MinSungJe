import InputView from '../view/InputView.js';
import loopWhileValid from './loopWhileValid.js';

const InputHandler = {
  async getFreeMoreInput(name, freeAmount) {
    let userInput = 'N';
    if (freeAmount > 0)
      userInput = await loopWhileValid(InputView.getFreeMore, name, freeAmount);
    processGetFreeMoreInput(userInput);
  },

  async askNotPromotionInput(name, amount, basicAmount, promotionCalculator) {
    let userInput = 'Y';
    if (promotionCalculator.getPromotionProductQuantity(name) < amount)
      userInput = await loopWhileValid(
        InputView.askNotPromotion,
        name,
        basicAmount
      );
    processNotPromotionInput(userInput);
  },

  async memberShipInput(recipt) {
    const userInput = await loopWhileValid(InputView.getMembership);
    if (userInput === 'Y') recipt.calculateMembershipDiscount();
  },
};

const processGetFreeMoreInput = (userInput) => {
  if (userInput === 'Y') {
  }
  if (userInput === 'N') {
  }
};

const processNotPromotionInput = (userInput) => {
  if (userInput === 'Y') {
  }
  if (userInput === 'N') {
  }
};

export default InputHandler;
