import { createAction } from "@reduxjs/toolkit";
import { CatImage } from "./types";

export const catsActions = {
  selectAndUploadCatPhoto: {
    base: createAction<void>("cats/selectAndUploadCatPhoto/base"),
    request: createAction<void>("cats/selectAndUploadCatPhoto/request"),
    success: createAction<void>("cats/selectAndUploadCatPhoto/success"),
    failed: createAction<Error | undefined | string>(
      "cats/selectAndUploadCatPhoto/failed",
    ),
  },
  fetchImages: {
    base: createAction<void>("cats/fetchImages/base"),
    request: createAction<void>("cats/fetchImages/request"),
    success: createAction<CatImage[]>("cats/fetchImages/success"),
    failed: createAction<Error | undefined | string>("cats/fetchImages/failed"),
  },
};
