import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { actions } from "@/domain/rootActions";
import { api } from "@/domain/rootApi";
import { Vote, Votes } from "../types";

export function* fetchVotes(): SagaIterator {
  try {
    yield put(actions.cats.fetchVotes.request());
    const result: ApiResponse<Votes[]> = yield call(api.cats.fetchVotes);
    if (result.ok && !!result.data) {
      yield put(actions.cats.fetchVotes.success(result.data));
    } else {
      yield put(actions.cats.fetchVotes.failed());
    }
  } catch (error) {
    yield put(actions.cats.fetchVotes.failed((error as Error).message));
  }
}

export function* submitVote(action: {
  type: string;
  payload: Vote;
}): SagaIterator {
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
    yield put(actions.cats.submitVote.failed((error as Error).message));
  }
}
