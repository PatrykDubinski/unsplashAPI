import photosTypes from "./photos.types";

export const getPhotos = (query) => ({
  type: photosTypes.GET_PHOTOS,
  payload: query,
});

export const getPhotosStart = () => ({
  type: photosTypes.GET_PHOTOS_START,
});

export const getPhotosSuccess = (photos) => ({
  type: photosTypes.GET_PHOTOS_SUCCESS,
  payload: photos,
});

export const getPhotosFail = (error) => ({
  type: photosTypes.GET_PHOTOS_FAIL,
  payload: error,
});

export const getTopics = () => ({
  type: photosTypes.GET_TOPICS,
});

export const getTopicsStart = () => ({
  type: photosTypes.GET_TOPICS_START,
});

export const getTopicsSuccess = (topics) => ({
  type: photosTypes.GET_TOPICS_SUCCESS,
  payload: topics,
});

export const getTopicsFail = (error) => ({
  type: photosTypes.GET_TOPICS_FAIL,
  payload: error,
});
