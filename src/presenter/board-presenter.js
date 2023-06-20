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
    this.eventsList = new EventsListView();
    this.eventModel = new EventsModel();

    this.events = this.eventModel.getEvents();
    this.destinations = this.eventModel.getDestinations();
    this.offersByType = this.eventModel.getOffersByType();
    this.eventEditListComponent = new EventEditList(this.events[0], this.destinations, this.offersByType);
  }

  init() {
    render(this.boardComponent, this.boardContainer, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.boardContainer,);
    render(this.sortComponent, this.bodyContainer);
    render(this.eventsList, this.bodyContainer);
    render(this.eventEditListComponent, this.eventsList.getElement());

    for (const event of this.events) {
      render(new EventItemView(event, this.destinations, this.offersByType), this.eventsList.getElement());
    }

  }
}
