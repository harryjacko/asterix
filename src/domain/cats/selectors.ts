import { RootState } from "../rootState";

export const catsSelectors = {
  getImages: (state: RootState) => {
    return state.cats.images;
  },
};
