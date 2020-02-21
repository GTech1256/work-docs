import AbstractComponent from "../components/abstract-component";

export enum RenderPosition {
  AFTERBEGIN = 'afterbegin',
  BEFOREEND = 'beforeend'
};

export const createElement = (template: string) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild as HTMLElement;
};

export const render = (container: HTMLElement, component: AbstractComponent, place: RenderPosition = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const remove = (component: AbstractComponent) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent: AbstractComponent, oldComponent: AbstractComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
