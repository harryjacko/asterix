import { SagaIterator } from "redux-saga";
import { all, call, takeLatest } from "redux-saga/effects";
import * as ImagePicker from "expo-image-picker";

import { actions } from "../rootActions";

/**
 * Should
 *  Launch photo selection - should probably be it's own util function?
 *  Upload photo
 *  Error handling / loading states / etc.
 */
function* selectAndUploadCatPhoto(): SagaIterator {
  const result = yield call(
    [ImagePicker, ImagePicker.launchImageLibraryAsync],
    {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    },
  );

  console.log(result);
}

export default function* catsSagas() {
  yield all([
    takeLatest(
      [actions.cats.selectAndUploadCatPhoto.base.type],
      selectAndUploadCatPhoto,
    ),
  ]);
}
