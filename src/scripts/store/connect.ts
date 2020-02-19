import AbstractComponent from "../components/abstract-component";
import {IStore} from ".";

export default function connect(Copmponent: typeof AbstractComponent, store: IStore) {
  return new Copmponent(store)
}
