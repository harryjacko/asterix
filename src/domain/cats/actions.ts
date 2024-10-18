import { createAction } from "@reduxjs/toolkit";

export const catsActions = {
  selectAndUploadCatPhoto: {
    base: createAction<void>("cats/selectAndUploadCatPhoto/base"),
    request: createAction<void>("cats/selectAndUploadCatPhoto/request"),
    success: createAction<void>("cats/selectAndUploadCatPhoto/success"),
    failed: createAction<Error | undefined>(
      "cats/selectAndUploadCatPhoto/failed",
    ),
  },
};
