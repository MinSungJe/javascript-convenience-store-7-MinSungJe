import fs from 'fs';

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

export default Loader;
