import photosTypes from "./photos.types";

const initialState = {
  loading: false,
  error: null,
  photos: [],
  topics: [],
};

const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case photosTypes.GET_PHOTOS_START:
      return {
        ...state,
        loading: true,
      };
    case photosTypes.GET_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photos: action.payload,
      };
    case photosTypes.GET_PHOTOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case photosTypes.GET_TOPICS_START:
      return {
        ...state,
        loading: true,
      };
    case photosTypes.GET_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        topics: action.payload,
      };
    case photosTypes.GET_TOPICS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default photosReducer;
