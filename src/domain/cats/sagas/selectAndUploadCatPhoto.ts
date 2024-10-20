import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import * as ImagePicker from "expo-image-picker";

import { actions } from "@/domain/rootActions";
import { api } from "@/domain/rootApi";

export default function* selectAndUploadCatPhoto(): SagaIterator {
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
    yield put(
      actions.cats.selectAndUploadCatPhoto.failed((error as Error).message),
    );
  }
}
