import { createElement } from '../render.js';
import { EVENT_TYPES } from './const.js';
const upFirstLetter = (word) => `${word[0].toUpperCase}${word.slice(1)}`;
const formatOfferTitle = (title) => title.split(' ').join('_');

const createEventEditTemplate = (event, destinations, offersByType) => {
  const eventDestination = destinations.find((dest) => dest.id === event.destinations);
  const eventTypeOffers = offersByType.find((off) => off.type === event.type).offers;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

    ${EVENT_TYPES.map((type) => (
      `<div class="event__type-item">
          <input id="event-type-${type}-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${event.id}">${upFirstLetter(type)}</label>
        </div>`
    )).join('')}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${event.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${'19/03/19 00:00'}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${'19/03/19 00:00'}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>


        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">

    ${eventTypeOffers.map((typeOffer) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-1" 
          type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${event.offer.includes(typeOffer.id) ? 'checked' : ''} >
        <label class="event__offer-label" for="event-offer-${formatOfferTitle(typeOffer.title)}-1">
          <span class="event__offer-title">${typeOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${typeOffer.price}</span>
        </label>
      </div>`
    )).join('')}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${eventDestination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${eventDestination.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}"></img>`)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EventEditList {
  constructor(event) {
    this.event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this.event, this.destinations, this.offersByType);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
