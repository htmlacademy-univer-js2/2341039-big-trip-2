import AbstractView from '../framework/view/abstract-view.js';
import { EVENT_TYPES } from './const.js';
const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
const formatOfferTitle = (title) => title.split(' ').join('_');

const createEventEditTemplate = (event, destinations, offersByType) => {
  const eventDestination = destinations.find((dest) => dest.id === event.destination);
  const eventTypeOffers = offersByType.find((off) => off.type === event.type).offers;
  const eventId = event.id || 0;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

    ${EVENT_TYPES.map((type) => (
      `<div class="event__type-item">
          <input id="event-type-${type}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${event.type === type ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${eventId}">${upFirstLetter(type)}</label>
        </div>`
    )).join('')}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${eventId}">
              ${event.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${eventDestination?.name || ''}" list="destination-list-${eventId}">
            <datalist id="destination-list-${eventId}">
            ${destinations.map((dest) => `option value="${dest.name}"><option>`).join('')}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time" value="${'19/03/19 00:00'}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time" value="${'19/03/19 00:00'}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${eventId}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${event.basePrice}">
          </div>
            <button class="event__save-btn  btn  btn--blue" type="submit">${event.id ? 'Save' : 'Save'}</button>
            <button class="event__reset-btn" type="reset">${event.id ? 'Delete' : 'Cancel'}</button>
            ${event.id ? (
      `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
    ) : ''}
            
        </header>


        <section class="event__details">
        ${eventTypeOffers.length > 0 ? (
      `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">

    ${eventTypeOffers.map((typeOffer) => (
        `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${eventId}" 
          type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${event.offers.includes(typeOffer.id) ? 'checked' : ''} >
        <label class="event__offer-label" for="event-offer-${formatOfferTitle(typeOffer.title)}-${eventId}">
          <span class="event__offer-title">${typeOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${typeOffer.price}</span>
        </label>
      </div>`
      )).join('')}
            </div>
          </section>`
    ) : ''}
          
          ${eventDestination ? (
      `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${eventDestination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${eventDestination.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}"></img>`)}
              </div>
            </div>
          </section>`
    ) : null}
          
        </section>
      </form>
    </li>`
  );
};

export default class TaskEditView extends AbstractView {
  #event = null
  #destinations = []
  #offersByType = []

  constructor(event, destinations, offersByType) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }

  get template() {
    return createEventEditTemplate(this.#event, this.#destinations, this.#offersByType);
  }

  setModeButtonClickHandler = (callback) => {
    const modeButton = this.element.querySelector('.event__rollup-btn');
    if (modeButton) {
      this._callback.modeButtonClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#modeButtonClickHandler);
    }
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }

  setFormResetHandler = (callback) => {
    this._callback.formReset = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('reset', this.#formResetHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this._callback.formReset();
  }

  #modeButtonClickHandler = () => {
    this._callback.modeButtonClick();
  }
}
