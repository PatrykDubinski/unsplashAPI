import { all, call } from "redux-saga/effects";
import photosSaga from "./Photos/photos.sagas";

export default function* rootSaga() {
  yield all([call(photosSaga)]);
}
