const padString = (string, value) => {
  return string.padEnd(value - string.length);
};

export default padString;
