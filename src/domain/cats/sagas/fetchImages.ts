import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { actions } from "@/domain/rootActions";
import { api } from "@/domain/rootApi";
import { CatImage } from "../types";

export default function* fetchImages(): SagaIterator {
  try {
    yield put(actions.cats.fetchImages.request());

    const result: ApiResponse<CatImage[]> = yield call(api.cats.fetchImages);

    if (result.ok && !!result.data) {
      yield put(actions.cats.fetchImages.success(result.data));
    } else {
      yield put(actions.cats.fetchImages.failed());
    }
  } catch (error) {
    yield put(actions.cats.fetchImages.failed((error as Error).message));
  }
}
