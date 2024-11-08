import { DateTimes } from '@woowacourse/mission-utils';

class PromotionInfo {
  #eventList = [];

  addEvent(name, buy, get, startDate, endDate) {
    this.#eventList.push({ name, buy, get, startDate, endDate });
  }

  getEvent(eventName) {
    return this.#eventList.find((event) => event.name === eventName);
  }

  checkApplicable(eventName) {
    const event = this.getEvent(eventName);

    const today = DateTimes.now();
    const startDay = new Date(event.startDate);
    const endDay = new Date(event.endDate);

    return today >= startDay && today <= endDay;
  }
}

export default PromotionInfo;
