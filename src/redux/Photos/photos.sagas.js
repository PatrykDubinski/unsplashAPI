import Axios from "axios";
import { all, put, takeLatest, call } from "redux-saga/effects";
import photosTypes from "./photos.types";
import {
  getPhotosSuccess,
  getPhotosFail,
  getPhotosStart,
  getTopicsStart,
  getTopicsFail,
  getTopicsSuccess,
} from "./photos.actions";

// Get Photos by query

export function* getPhotosByQuery({ payload }) {
  yield put(getPhotosStart());
  try {
    const res = yield Axios.get(
      `https://api.unsplash.com/search/photos/?query=${payload}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
    );
    yield put(getPhotosSuccess(res.data.results));
  } catch (error) {
    yield put(getPhotosFail(error));
  }
}

export function* onGetPhotosByQuery() {
  yield takeLatest(photosTypes.GET_PHOTOS, getPhotosByQuery);
}

// Get topics for auto suggestion

export function* getTopics() {
  yield put(getTopicsStart());
  try {
    const res = yield Axios.get(
      `https://api.unsplash.com/topics/?per_page=100&client_id=${process.env.REACT_APP_API_KEY}`
    );
    yield put(getTopicsSuccess(res.data.map((title) => title.title)));
  } catch (error) {
    yield put(getTopicsFail(error));
  }
}

export function* onGetTopics() {
  yield takeLatest(photosTypes.GET_TOPICS, getTopics);
}

export default function* photosSagas() {
  yield all([call(onGetPhotosByQuery), call(onGetTopics)]);
}
