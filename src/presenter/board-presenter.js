import BoardView from '../view/board-view.js';
import FiltersView from '../view/filters-view';
import EventItemView from '../view/event-item-view';
import {RenderPosition, render} from '../render.js';
import EventEditList from '../view/event-edit-item-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsModel from '../model/events-model.js';

export default class Presenter {
  #boardContainer = null;
  #bodyContainer = null;
  #eventsList = null;

  constructor({boardContainer, bodyContainer}) {
    this.#boardContainer = boardContainer;
    this.#bodyContainer = bodyContainer;
    this.boardComponent = new BoardView();
    this.filterComponent = new FiltersView();
    this.sortComponent = new SortView();
    this.#eventsList = new EventsListView();
    this.eventModel = new EventsModel();

    this.events = this.eventModel.getEvents();
    this.destinations = this.eventModel.getDestinations();
    this.offersByType = this.eventModel.getOffersByType();
    this.eventEditListComponent = new EventEditList(this.events[0], this.destinations, this.offersByType);
  }

  init() {
    render(this.boardComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    render(this.sortComponent, this.#boardContainer);
    render(this.#eventsList, this.#bodyContainer);

    for (const event of this.events) {
      this.#renderEvent(event, this.destinations, this.offersByType);
    }
  }

  #renderEvent(event, destinations, offersByType) {
    const eventComponent = new EventItemView(event, destinations, offersByType);
    const eventEditComponent = new EventEditList(event, destinations, offersByType);

    const turnEventToEdit = () => {
      this.#eventsList.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };
    const turnEventToView = () => {
      this.#eventsList.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    const onEscKeyup = (evt) => {
      if (evt.key === 'Escape') {
        turnEventToView();
        document.removeEventListener('keyup', onEscKeyup);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      turnEventToEdit();
      document.removeEventListener('keyup', onEscKeyup);
    });
    eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      turnEventToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    eventEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      turnEventToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    eventEditComponent.element.querySelector('.event--edit').addEventListener('reset', (evt) => {
      evt.preventDefault();
      turnEventToView();
      document.removeEventListener('keyup', onEscKeyup);
    });

    render(eventComponent, this.#eventsList.element);
  }
}
