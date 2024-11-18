import OutputView from '../view/OutputView.js';

const loopWhileValid = async (func, ...args) => {
  while (true) {
    try {
      return await func(...args);
    } catch (error) {
      OutputView.printMessage(error.message);
      OutputView.printBlankLine();
    }
  }
};

export default loopWhileValid;
