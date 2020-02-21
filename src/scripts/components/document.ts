import AbstractComponent from './abstract-component';
import {TableShow} from "../presenters/document";
import { GraphPosition } from '../models/graph';

const textareaVertexName = 'vertex'
const tableInputVertexName = 'view'
export const CLASS_NAME = "document";

const emptyTemplate = `
<section>
  <p>документ пуст, добавьте первую вершину</p>
</section>`

const getFormTemplate = () => `
<form>
  <textarea name="${textareaVertexName}">Название вершины</textarea>
  <button type="sumbit">Добавить</button>
</form>
`

const getTableTemplate = () => `
<div class="table">
  <label>
    Вершины
    <input type="radio" name="${tableInputVertexName}" value="${TableShow.VERTEX}" checked>
  </label>
  <label>
    Ребра
    <input type="radio" name="${tableInputVertexName}" value="${TableShow.EDGES}">
  </label>
</div>`

const getCanvasTemplate = () => `
<div class="canvas">
</div>
`

const getNonEmptyTemplate = () => `

${getTableTemplate()}
${getCanvasTemplate()}
`

const createTemplate = (isEmpty: boolean) => {
  return (
    `<article class="${CLASS_NAME}">
      ${getFormTemplate()}
      ${isEmpty ? emptyTemplate : getNonEmptyTemplate()}
    </article>`
  );
};


export default class DocumentComponent extends AbstractComponent {
  private _isEmpty: boolean

  constructor(isEmpty: boolean) {
    super()

    this._isEmpty = isEmpty
  }

  getTemplate() {
    return createTemplate(this._isEmpty);
  }

  setOnChangeViewType(handler: (value: TableShow) => void) {
    this.getElement().addEventListener(`click`, (evt: MouseEvent) => {
      const target = evt.target as HTMLInputElement;

      if (target.tagName === "INPUT") {
        const radioElement = this.getElement()
          .querySelector(`[name="${tableInputVertexName}"]:checked`) as HTMLInputElement
        handler(radioElement.value as unknown as TableShow);
      }
    })
  }

  setOnAddVertex(handler: (vertexName: string, position: GraphPosition) => void) {
    const form = this.getElement()
      .querySelector('form')

    if (!form) {
      throw new Error("Форма не найдена")
    }

    form.addEventListener(`submit`, (evt: Event) => {
      evt.preventDefault();

      const fd = new FormData(form);

      const vertexName = fd.get(textareaVertexName)

      if (!vertexName) {
        throw new Error(`в форме не найдено поле с именем ${textareaVertexName}`)
      }

      if (vertexName instanceof File) {
        throw new Error(`в форме поле с именем ${textareaVertexName} является файлом, а ожидалась строка`)
      }

      handler(vertexName, [0, 0]);

    })
  }
}
