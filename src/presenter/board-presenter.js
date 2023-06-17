import BoardView from '../view/board-view.js';
import FiltersView from '../view/filters-view';
import EventItemView from '../view/event-item-view';
import {RenderPosition, render} from '../render.js';
import EventEditList from '../view/event-edit-item-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsModel from '../model/events-model.js';

export default class Presenter {
  constructor({boardContainer, bodyContainer}) {
    this.boardContainer = boardContainer;
    this.bodyContainer = bodyContainer;
    this.boardComponent = new BoardView();
    this.filterComponent = new FiltersView();
    this.sortComponent = new SortView();
    this.eventEditListComponent = new EventEditList();
    this.eventsList = new EventsListView();
    this.eventModel = new EventsModel();
  }

  init() {
    const events = this.eventModel.getEvents();
    const destinations = this.eventModel.getDestinations();
    const offersByType = this.eventModel.getOffersByType();

    render(this.boardComponent, this.boardContainer, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.boardContainer, RenderPosition.BEFOREEND);
    render(this.sortComponent, this.bodyContainer, RenderPosition.BEFOREEND);
    render(this.eventsList, this.bodyContainer, RenderPosition.BEFOREEND);

    for (const event of events) {
      render(new EventItemView(event, destinations, offersByType), this.eventsList.getElement());
    }

  }
}
