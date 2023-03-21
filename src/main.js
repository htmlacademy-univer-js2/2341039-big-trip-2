import  Presenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.trip-events');
const boardPresenter = new Presenter({boardContainer: siteMainElement, bodyContainer: siteHeaderElement});

boardPresenter.init();
