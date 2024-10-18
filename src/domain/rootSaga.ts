import { all } from "redux-saga/effects";
import catsSagas from "./cats/sagas";

export default function* rootSaga() {
  yield all([catsSagas()]);
}
