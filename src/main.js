import Presenter from './presenter/board-presenter.js';
import EventsModel from './model/events-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const boardPresenter = new Presenter({boardContainer: siteMainElement, bodyContainer: siteHeaderElement});

boardPresenter.init();

const eventModel = new EventsModel();

const filterPresenter = new FilterPresenter({container: filtersContainer, eventsModel: eventModel});
filterPresenter.init();
