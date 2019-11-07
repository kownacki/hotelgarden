import moment from "moment";

export const hyphenate = _.flow(
  _.replace(/'/g, ''),
  _.toLower,
  _.words,
  _.join('-'),
);
export const splitEvents = (events) => [
  _.flow([
    _.filter((event) => moment().isSameOrBefore(event.date, 'day')),
    _.sortBy('date'),
  ])(events),
  _.flow([
    _.filter((event) => moment().isAfter(event.date, 'day')),
    _.sortBy('date'),
  ])(events)
];
