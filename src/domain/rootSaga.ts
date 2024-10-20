import { all } from "redux-saga/effects";
import catsSagas from "./cats/sagas/index";

export default function* rootSaga() {
  yield all([catsSagas()]);
}
