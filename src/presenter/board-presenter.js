import BoardView from '../view/board-view.js';
import FiltersView from '../view/filters-view';
import EventItemView from '../view/event-item-view';
import {RenderPosition, render,} from '../render.js';
import EventEditList from '../view/event-edit-item-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';

export default class Presenter {
  boardComponent = new BoardView();
  filterComponent = new FiltersView();
  sortComponent = new SortView();
  eventEditListComponent = new EventEditList();
  eventsList = new EventsListView();

  constructor({boardContainer, bodyContainer}) {
    this.boardContainer = boardContainer;
    this.bodyContainer = bodyContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.boardContainer,);
    render(this.sortComponent, this.bodyContainer);
    render(this.eventsList, this.bodyContainer);
    render(this.eventEditListComponent, this.eventsList.getElement());
    // render(new EventEditView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventsList.getElement());
    }

  }
}
