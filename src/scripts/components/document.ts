import AbstractComponent from './abstract-component';

const createTemplate = () => {
  return (
    `<article>
    </article>`
  );
};


export default class DocumentComponent extends AbstractComponent {
  getTemplate() {
    return createTemplate();
  }
}
