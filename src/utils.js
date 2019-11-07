import moment from "moment";

export const hyphenate = _.flow(
  _.replace(/'/g, ''),
  _.toLower,
  _.words,
  _.join('-'),
);
export const splitEvents = (events) => [
  _.flow([
    _.filter((event) => event.date >= moment().format('YYYY-MM-DD')),
    _.sortBy('date'),
  ])(events),
  _.flow([
    _.filter((event) => event.date < moment().format('YYYY-MM-DD')),
    _.sortBy('date'),
  ])(events)
];
