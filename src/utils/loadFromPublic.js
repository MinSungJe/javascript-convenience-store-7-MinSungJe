import fs from 'fs';
import Inventory from '../model/Inventory.js';
import PromotionInfo from '../model/PromotionInfo.js';
import Product from '../model/Product.js';

const loadFromPublic = () => {
  const inventory = new Inventory();
  const promotionInfo = new PromotionInfo();

  addProducts(inventory);
  addPromotions(promotionInfo);

  return { inventory, promotionInfo };
};

const convertProductsList = () => {
  return Loader.products().map(
    ({ name, price, quantity, promotion }) =>
      new Product(name, price, quantity, promotion)
  );
};

const addProducts = (inventory) => {
  convertProductsList().forEach((product) => {
    inventory.add(product);
  });
};

const addPromotions = (promotionInfo) => {
  Loader.promotions().forEach(({ name, buy, get, startDate, endDate }) => {
    promotionInfo.addEvent(name, buy, get, startDate, endDate);
  });
};

const Loader = {
  products: () => {
    return loadFileSync('./public/products.md');
  },

  promotions: () => {
    return loadFileSync('./public/promotions.md');
  },
};

const loadFileSync = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const rows = data.trim().split('\n');
    const headers = rows[0].trim('\r').split(',');

    return makeDataArray(headers, rows.slice(1));
  } catch (err) {
    throw new Error('[ERROR] 정해진 경로에 파일이 없습니다.');
  }
};

const makeDataArray = (headers, body) => {
  return body.map((row) => {
    const values = row.split(',');
    return createObjectFromRow(values, headers);
  });
};

const createObjectFromRow = (values, headers) => {
  return headers.reduce((acc, header, index) => {
    acc[header] = parseValue(values[index]);
    return acc;
  }, {});
};

const parseValue = (value) => {
  const trimmedValue = value.trim('\r');
  if (trimmedValue === 'null') return null;
  if (!isNaN(trimmedValue)) return Number(trimmedValue);
  return trimmedValue;
};

export default loadFromPublic;
