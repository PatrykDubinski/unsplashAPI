import { combineReducers } from "redux";

import photosReducer from "./Photos/photos.reducer";

export default combineReducers({
  photos: photosReducer,
});
