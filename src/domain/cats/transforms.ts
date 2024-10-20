import {
  FavouriteImage,
  FavouritesByImageId,
  Votes,
  VotesTalliedByImageId,
} from "./types";

export function transformFavouritesByImageId(favourites: FavouriteImage[]) {
  return favourites.reduce((acc, fav) => {
    acc[fav.image.id] = fav.id;
    return acc;
  }, {} as FavouritesByImageId);
}

export function transformVotesByImageIdAndTally(votes: Votes[]) {
  return votes.reduce((acc, vote) => {
    acc[vote.image.id] = (acc[vote.image.id] || 0) + vote.value;
    return acc;
  }, {} as VotesTalliedByImageId);
}
