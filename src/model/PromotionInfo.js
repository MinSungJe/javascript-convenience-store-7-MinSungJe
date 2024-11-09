import { DateTimes } from '@woowacourse/mission-utils';

class PromotionInfo {
  #eventList = [];

  addEvent(name, buy, get, start_date, end_date) {
    this.#eventList.push({ name, buy, get, start_date, end_date });
  }

  getEvent(eventName) {
    return this.#eventList.find((event) => event.name === eventName);
  }

  checkApplicable(eventName) {
    const event = this.getEvent(eventName);

    const today = DateTimes.now();
    const startDay = new Date(event.start_date);
    const endDay = new Date(event.end_date);

    return today >= startDay && today <= endDay;
  }
}

export default PromotionInfo;
