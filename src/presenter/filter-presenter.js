import { render } from '../framework/render';
import FilterView from '../view/filters-view';

export default class FilterPresenter {
    #filterContainer = null;
    #eventModel = null;

    constructor({container, eventsModel}) {
      this.#filterContainer = container;
      this.#eventModel = eventsModel;
    }

    init() {
      const events = this.#eventModel.getEvents();
      const pastEvents = events.filter((event) => new Date(event.dateTo).getTime() < Date.now());
      const futureEvents = events.filter((event) => new Date(event.dateFrom).getTime() >= Date.now());

      render(new FilterView(pastEvents, futureEvents), this.#filterContainer);
    }
}
