import fs from 'fs';
import Inventory from '../model/Inventory.js';
import PromotionInfo from '../model/PromotionInfo.js';
import Product from '../model/Product.js';
import { LoadPath } from '../constant/config.js';

const loadFromPublic = () => {
  const inventory = new Inventory();
  const promotionInfo = new PromotionInfo();

  addProducts(inventory);
  addPromotions(promotionInfo);

  return { inventory, promotionInfo };
};

const createProductsList = () => {
  return Loader.products().map(
    ({ name, price, quantity, promotion }) =>
      new Product(name, price, quantity, promotion)
  );
};

const addProducts = (inventory) => {
  createProductsList().forEach((product) => {
    inventory.add(product);
  });
};

const addPromotions = (promotionInfo) => {
  Loader.promotions().forEach(({ name, buy, get, start_date, end_date }) => {
    promotionInfo.addEvent(name, buy, get, start_date, end_date);
  });
};

const Loader = {
  products: () => {
    return loadFileSync(LoadPath.PRODUCTS);
  },

  promotions: () => {
    return loadFileSync(LoadPath.PROMOTIONS);
  },
};

const loadFileSync = (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.trim().split('\n');
  const headers = rows[0].trim('\r').split(',');

  return createDataArray(headers, rows.slice(1));
};

const createDataArray = (headers, body) => {
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
