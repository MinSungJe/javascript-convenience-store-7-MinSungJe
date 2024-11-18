import { INPUT_SPLITER, ITEM_FORMAT_REGEXP } from '../constant/config.js';

const parseItemInput = (itemInput) => {
  const itemStringList = itemInput.split(INPUT_SPLITER);

  return itemStringList.reduce((itemList, itemString) => {
    const [_, name, amount] = itemString.match(ITEM_FORMAT_REGEXP);
    return [...itemList, { name, amount: Number(amount) }];
  }, []);
};

export default parseItemInput;
