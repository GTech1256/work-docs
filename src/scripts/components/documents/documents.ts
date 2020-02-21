import AbstractComponent from '../common/abstract-component';
import GraphsModel from '../../models/graphs';

const createTemplate = (graphs: GraphsModel) => {
  return (
    `<ul>
      ${graphs.getGraphs().map(it => `<li><button data-id="${it.id}">${it.id}</button></li>`).join('')}
      <li><button>Добавить документ</button></li>
    </ul>`
  );
};


export default class DocumentsComponent extends AbstractComponent {
  private _graphs: GraphsModel
  private _newDocumentHandlers: (() => void)[] = []

  constructor(graphs: GraphsModel) {
    super();

    this._graphs = graphs;
  }

  getTemplate() {
    return createTemplate(this._graphs);
  }

  setOnClickGraph(handler: (graphId: string) => void) {
    this.getElement().addEventListener(`click`, (evt: MouseEvent) => {
      const target = evt.target as HTMLButtonElement;

      if (target.tagName !== `BUTTON`) {
        return;
      }

      if (!target.dataset.id) {
        this._onAddNewDocument()
        return;
      }

      handler(target.dataset.id);

    })
  }

  setOnAddNewDocument(handler: (() => void)) {
    this._newDocumentHandlers.push(handler)
  }

  private _onAddNewDocument() {
    this._newDocumentHandlers.forEach(it => it())
  }
}
