import { events } from '../mocks/events';
import { destinations } from '../mocks/destinations';
import { offersByType } from '../mocks/offers';

export default class EventsModel {
  constructor() {
    this.events = events;
    this.destinations = destinations;
    this.offersByType = offersByType;
  }

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOfffersByType() {
    return this.offersByType;
  }
}
