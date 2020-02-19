// import LoadMoreButtonComponent from '../components/load-more-button';
// import TasksComponent from '../components/tasks';
import GraphsModel from '../models/graphs';
// import SortComponent, {SortType} from '../components/sort';
// import NoTasksComponent from '../components/no-tasks';
// import {render, remove, RenderPosition} from '../utils/render';
// import TaskController, {Mode as TaskControllerMode, EmptyTask} from './task';
import AbstractComponent from '../components/abstract-component';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// const renderGraphs = (taskListElement, tasks, onDataChange, onViewChange) => {
//   return tasks.map((task) => {
//     const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
//     taskController.render(task, TaskControllerMode.DEFAULT);

//     return taskController;
//   });
// };

export default class DocumentPresenter {
  private _container: AbstractComponent;
  private _graphsModel: GraphsModel;
  // private _graphControllers: any[];
  // private _tasksComponent: TasksComponent;
  // private _loadMoreButtonComponent: LoadMoreButtonComponent;

  constructor(container: AbstractComponent, graphsModel: GraphsModel) {
    this._container = container;
    this._graphsModel = graphsModel;

    // this._graphControllers = [];
    // this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    // this._noTasksComponent = new NoTasksComponent();
    // this._tasksComponent = new TasksComponent();
    // this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    // this._onDataChange = this._onDataChange.bind(this);
    // this._onSortTypeChange = this._onSortTypeChange.bind(this);
    // this._onViewChange = this._onViewChange.bind(this);
    // this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    // this._onFilterChange = this._onFilterChange.bind(this);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    // const container = this._container.getElement();
    // const tasks = this._graphsModel.getTasks();
    // const isAllTasksArchived = tasks.every((task) => task.isArchive);

    // if (isAllTasksArchived) {
    //   render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    // render(container, this._sortComponent, RenderPosition.BEFOREEND);
    // render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    // this._renderTasks(tasks.slice(0, this._showingTasksCount));

    // this._renderLoadMoreButton();
  }

  // createTask() {
  //   if (this._creatingTask) {
  //     return;
  //   }

  //   const taskListElement = this._tasksComponent.getElement();
  //   this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
  //   this._creatingTask.render(EmptyTask, TaskControllerMode.ADDING);
  // }

  // _removeTasks() {
  //   this._graphControllers.forEach((taskController) => taskController.destroy());
  //   this._graphControllers = [];
  // }

  // _renderTasks(tasks) {
  //   const taskListElement = this._tasksComponent.getElement();

  //   const newTasks = renderGraphs(taskListElement, tasks, this._onDataChange, this._onViewChange);
  //   this._graphControllers = this._graphControllers.concat(newTasks);
  //   this._showingTasksCount = this._graphControllers.length;
  // }

  // _renderLoadMoreButton() {
  //   remove(this._loadMoreButtonComponent);

  //   if (this._showingTasksCount >= this._graphsModel.getTasks().length) {
  //     return;
  //   }

  //   const container = this._container.getElement();
  //   render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  //   this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  // }

  // _updateTasks(count) {
  //   this._removeTasks();
  //   this._renderTasks(this._graphsModel.getTasks().slice(0, count));
  //   this._renderLoadMoreButton();
  // }

  // _onDataChange(taskController, oldData, newData) {
  //   if (oldData === EmptyTask) {
  //     this._creatingTask = null;
  //     if (newData === null) {
  //       taskController.destroy();
  //       this._updateTasks(this._showingTasksCount);
  //     } else {
  //       this._api.createTask(newData)
  //         .then((taskModel) => {
  //           this._graphsModel.addGraph(taskModel);
  //           taskController.render(taskModel, TaskControllerMode.DEFAULT);

  //           const destroyedTask = this._graphControllers.pop();
  //           destroyedTask.destroy();

  //           this._graphControllers = [].concat(taskController, this._graphControllers);
  //           this._showingTasksCount = this._graphControllers.length;
  //         })
  //         .catch(() => {
  //           taskController.shake();
  //         });
  //     }
  //   } else if (newData === null) {
  //     this._api.deleteTask(oldData.id)
  //       .then(() => {
  //         this._graphsModel.removeTask(oldData.id);
  //         this._updateTasks(this._showingTasksCount);
  //       })
  //       .catch(() => {
  //         taskController.shake();
  //       });
  //   } else {
  //     this._api.updateTask(oldData.id, newData)
  //       .then((taskModel) => {
  //         const isSuccess = this._graphsModel.updateGraph(oldData.id, taskModel);

  //         if (isSuccess) {
  //           taskController.render(taskModel, TaskControllerMode.DEFAULT);
  //           this._updateTasks(this._showingTasksCount);
  //         }
  //       })
  //       .catch(() => {
  //         taskController.shake();
  //       });
  //   }
  // }

  // _onViewChange() {
  //   this._graphControllers.forEach((it) => it.setDefaultView());
  // }

  // _onSortTypeChange(sortType) {
  //   let sortedTasks = [];
  //   const tasks = this._graphsModel.getTasks();

  //   switch (sortType) {
  //     case SortType.DATE_UP:
  //       sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
  //       break;
  //     case SortType.DATE_DOWN:
  //       sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
  //       break;
  //     case SortType.DEFAULT:
  //       sortedTasks = tasks.slice(0, this._showingTasksCount);
  //       break;
  //   }

  //   this._removeTasks();
  //   this._renderTasks(sortedTasks);

  //   if (sortType === SortType.DEFAULT) {
  //     this._renderLoadMoreButton();
  //   } else {
  //     remove(this._loadMoreButtonComponent);
  //   }
  // }

  // _onLoadMoreButtonClick() {
  //   const prevTasksCount = this._showingTasksCount;
  //   const tasks = this._graphsModel.getTasks();

  //   this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  //   this._renderTasks(tasks.slice(prevTasksCount, this._showingTasksCount));

  //   if (this._showingTasksCount >= tasks.length) {
  //     remove(this._loadMoreButtonComponent);
  //   }
  // }

  // _onFilterChange() {
  //   this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  // }
}
