import AbstractComponent from '../common/abstract-component';
import GraphModel from "../../models/graph"

const createTemplate = (graphs: GraphModel) => {
  return (
    `<ul>
      ${graphs.getVertex().map(it => `
      <li>
        ${it}
      </li>`)
      .join('')}
    </ul>`
  );
};


export default class DocumentTableVertexComponent extends AbstractComponent {
  private _graphs: GraphModel

  constructor(graphs: GraphModel) {
    super();

    this._graphs = graphs;
  }

  getTemplate() {
    return createTemplate(this._graphs);
  }
}

