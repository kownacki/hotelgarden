export const hyphenate = _.flow(
  _.replace(/'/g, ''),
  _.toLower,
  _.words,
  _.join('-'),
);
