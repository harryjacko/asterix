import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { actions } from "@/domain/rootActions";
import { api } from "@/domain/rootApi";
import { FavouriteImage, RemoveFavouriteAction } from "../types";
import { CreateFavouriteResponse } from "../api";

export function* createFavourite(action: {
  type: string;
  payload: string;
}): SagaIterator {
  const imageId = action.payload;
  try {
    yield put(actions.cats.createFavourite.request({ imageId }));

    const result: ApiResponse<CreateFavouriteResponse> = yield call(
      api.cats.createFavourite,
      {
        image_id: action.payload,
      },
    );

    if (result.ok && !!result.data) {
      yield put(
        actions.cats.createFavourite.success({
          id: result.data.id,
          imageId,
        }),
      );
    } else {
      yield put(actions.cats.createFavourite.failed({ imageId }));
    }
  } catch (error) {
    yield put(
      actions.cats.createFavourite.failed({
        error: (error as Error).message,
        imageId,
      }),
    );
  }
}

export function* removeFavourite(action: {
  type: string;
  payload: RemoveFavouriteAction;
}): SagaIterator {
  const { imageId, favouriteId } = action.payload;
  try {
    yield put(actions.cats.removeFavourite.request({ imageId }));

    const result: ApiResponse<void> = yield call(
      api.cats.removeFavourite,
      favouriteId,
    );

    if (result.ok) {
      yield put(actions.cats.removeFavourite.success({ imageId }));
    } else {
      yield put(actions.cats.removeFavourite.failed({ imageId }));
    }
  } catch (error) {
    yield put(
      actions.cats.removeFavourite.failed({
        error: (error as Error).message,
        imageId,
      }),
    );
  }
}

export function* fetchFavourites(): SagaIterator {
  try {
    yield put(actions.cats.fetchFavourites.request());
    const result: ApiResponse<FavouriteImage[]> = yield call(
      api.cats.fetchFavourites,
    );
    if (result.ok && !!result.data) {
      yield put(actions.cats.fetchFavourites.success(result.data));
    } else {
      yield put(actions.cats.fetchFavourites.failed());
    }
  } catch (error) {
    yield put(actions.cats.fetchFavourites.failed((error as Error).message));
  }
}
