import BoardView from '../view/board-view.js';
import FiltersView from '../view/filters-view';
import EventItemView from '../view/event-item-view';
import {RenderPosition, render} from '../render.js';
import EventEditList from '../view/event-edit-item-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';

export default class Presenter {
  constructor({boardContainer, bodyContainer}) {
    this.boardContainer = boardContainer;
    this.bodyContainer = bodyContainer;
    this.boardComponent = new BoardView();
    this.filterComponent = new FiltersView();
    this.sortComponent = new SortView();
    this.eventEditListComponent = new EventEditList();
    this.eventsList = new EventsListView();
  }

  init() {
    render(this.boardComponent, this.boardContainer, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.boardContainer,);
    render(this.sortComponent, this.bodyContainer);
    render(this.eventsList, this.bodyContainer);
    render(this.eventEditListComponent, this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventsList.getElement());
    }

  }
}
