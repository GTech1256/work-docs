import AbstractComponent from './abstract-component';
import GraphModel from "../models/graph"

const createTemplate = (graphs: GraphModel) => {
  return (
    `<table>
      <thead>
        <th>name</th>
        <th>X</th>
        <th>Y</th>
      </thead>
      <tbody>
        ${graphs.getEdges().map(it => `
        <tr>
          <td>${it}</td>
        </tr>`)
        .join('')}
      </tbody>
    </table>`
  );
};


export default class DocumentTableEdgesComponent extends AbstractComponent {
  private _graphs: GraphModel

  constructor(graphs: GraphModel) {
    super();

    this._graphs = graphs;
  }

  getTemplate() {
    return createTemplate(this._graphs);
  }
}

