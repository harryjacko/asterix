import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as ImagePicker from "expo-image-picker";

import { actions } from "../rootActions";
import { ApiResponse } from "apisauce";
import { api } from "../rootApi";

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
        quality: 0.2,
      },
    );

    // User cancelled
    if (imageResult.canceled) {
      yield put(
        actions.cats.selectAndUploadCatPhoto.failed(new Error("UserCancelled")),
      );
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
      yield put(
        actions.cats.selectAndUploadCatPhoto.failed(new Error("UnknownError")),
      );
    }
  } catch (error) {
    yield put(actions.cats.selectAndUploadCatPhoto.failed(error as Error));
  }
}

// function* fetchImages(): SagaIterator {
//   try {
//     const result: ApiResponse<ImageURISource[]> = yield call(
//       api.cats.fetchImages,
//     );
//     console.log(result.data);
//   } catch (error) {}
// }

export default function* catsSagas() {
  yield all([
    takeLatest(
      [actions.cats.selectAndUploadCatPhoto.base.type],
      selectAndUploadCatPhoto,
    ),
  ]);
}
