import AbstractComponent from '../../common/abstract-component';
import GraphModel from "../../../models/graph"

const createTemplate = (graphs: GraphModel) => {
  return (
    `<table>
      <thead>
        <th>Connected edge</th>
      </thead>
      <tbody>
        ${graphs.getEdges().map(({connectedEdges}) => connectedEdges.map(edge => `
        <tr>
          <td>${edge}</td>
        </tr>`))
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

