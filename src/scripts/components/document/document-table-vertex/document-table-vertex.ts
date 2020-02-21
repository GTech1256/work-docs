import AbstractComponent from '../../common/abstract-component';
import GraphModel from "../../../models/graph"

const createTemplate = (graphs: GraphModel) => {
  return (
    `<table>
      <thead>
        <th>name</th>
        <th>X</th>
        <th>Y</th>
      </thead>
      <tbody>
        ${graphs.getAll().map(([name, { position}]) => `
        <tr>
          <td>${name}</td>
          <td>${position[0]}</td>
          <td>${position[1]}</td>
        </tr>`)
        .join('')}
      </tbody>
    </table>`
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

