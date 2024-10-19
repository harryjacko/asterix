import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as ImagePicker from "expo-image-picker";

import { actions } from "../rootActions";
import { ApiResponse } from "apisauce";
import { api } from "../rootApi";
import { CatImage, Vote } from "./types";

/**
 * Should
 *  Launch photo selection - should probably be it's own util function?
 *  Upload photo
 *  Error handling / loading states / etc.
 */
function* selectAndUploadCatPhoto(): SagaIterator {
  try {
    yield put(actions.cats.selectAndUploadCatPhoto.request());

    const imageResult: ImagePicker.ImagePickerResult = yield call(
      [ImagePicker, ImagePicker.launchImageLibraryAsync],
      {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      },
    );

    // User cancelled
    if (imageResult.canceled) {
      yield put(actions.cats.selectAndUploadCatPhoto.failed("UserCancelled"));
      return;
    }

    // We have an image lets upload it
    if (imageResult.assets.length > 0) {
      const fileUri = imageResult.assets[0].uri;

      const result: ApiResponse<void> = yield call(
        api.cats.uploadPhoto,
        fileUri,
      );

      if (result.ok) {
        yield put(actions.cats.selectAndUploadCatPhoto.success());
      }
    } else {
      yield put(actions.cats.selectAndUploadCatPhoto.failed("UnknownError"));
    }
  } catch (error) {
    yield put(actions.cats.selectAndUploadCatPhoto.failed(error as Error));
  }
}

function* fetchImages(): SagaIterator {
  try {
    yield put(actions.cats.fetchImages.request());

    const result: ApiResponse<CatImage[]> = yield call(api.cats.fetchImages);

    if (result.ok && !!result.data) {
      yield put(actions.cats.fetchImages.success(result.data));
      console.log(result.data);
    } else {
      yield put(actions.cats.fetchImages.failed());
    }
  } catch (error) {
    yield put(actions.cats.fetchImages.failed(error as Error));
  }
}

function* submitVote(action: { type: string; payload: Vote }): SagaIterator {
  try {
    yield put(actions.cats.submitVote.request());
    const value = action.payload.value === "up" ? 1 : -1; // 1 for upvote, -1 for downvote
    const result: ApiResponse<void> = yield call(api.cats.submitVote, {
      image_id: action.payload.imageId,
      value,
    });

    if (result.ok) {
      yield put(actions.cats.submitVote.success());
    } else {
      yield put(actions.cats.submitVote.failed());
    }
  } catch (error) {
    yield put(actions.cats.submitVote.failed(error as Error));
  }
}

export default function* catsSagas() {
  yield all([
    takeLatest(
      [actions.cats.selectAndUploadCatPhoto.base.type],
      selectAndUploadCatPhoto,
    ),
    takeLatest([actions.cats.fetchImages.base.type], fetchImages),
    takeLatest(
      [actions.cats.selectAndUploadCatPhoto.success.type],
      fetchImages,
    ),
    takeLatest([actions.cats.submitVote.base.type], submitVote),
  ]);
}
