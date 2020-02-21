import AbstractComponent from '../common/abstract-component';

const createTemplate = () => {
  return (
    `<main>
    </main>`
  );
};


export default class AppComponent extends AbstractComponent {
  getTemplate() {
    return createTemplate();
  }
}
