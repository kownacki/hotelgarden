// to do don't use global moment
// @ts-ignore
const moment = window.moment;
export const isEventToday = (event) => {
    return moment().isSame(event.date, 'day');
};
export const isEventUpcoming = (event) => {
    return moment().isBefore(event.date, 'day');
};
export const isEventTodayOrUpcoming = (event) => {
    return isEventToday(event) || isEventUpcoming(event);
};
export const isEventPast = (event) => {
    return !isEventTodayOrUpcoming(event);
};
export const getPromotedEventData = (promotedEventUid, eventsList) => {
    const promotedEvent = eventsList === null || eventsList === void 0 ? void 0 : eventsList[promotedEventUid];
    return promotedEvent && isEventUpcoming(promotedEvent)
        ? {
            uid: promotedEventUid,
            event: promotedEvent,
        }
        : undefined;
};
