import AbstractView from '../framework/view/abstract-view.js';

const CreateFirtersTemplate = (pastEvents, futureEvents) => (`<div class="trip-controls__filters">
<h2 class="visually-hidden">Filter events</h2>
<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${futureEvents.length === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${pastEvents.length === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>`
);

export default class FilterView extends AbstractView {
  #pastEvents = []
  #futureEvents = []

  constructor(pastEvents, futureEvents) {
    super();
    this.#pastEvents = pastEvents;
    this.#futureEvents = futureEvents;
  }

  get template() {
    return CreateFirtersTemplate(this.#pastEvents, this.#futureEvents);
  }
}
