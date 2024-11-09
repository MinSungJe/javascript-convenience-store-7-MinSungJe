const readItemRegExp = /^\[(.+)-(\d+)\]$/;

const parseItemInput = (itemInput) => {
  const itemStringList = itemInput.split(',');

  return itemStringList.reduce((itemList, itemString) => {
    const [_, name, amount] = itemString.match(readItemRegExp);
    return [...itemList, { name, amount: Number(amount) }];
  }, []);
};

export default parseItemInput;
