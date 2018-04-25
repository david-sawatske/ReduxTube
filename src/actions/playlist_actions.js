export const POPULATE_PLAYLIST = 'POPULATE_PLAYLIST';
export const VIDEO_REMOVE = 'VIDEO_REMOVE';
export const VIDEO_ADD = 'VIDEO_ADD';

export const removeVideo = video => ({
  type: VIDEO_REMOVE,
  video
});

export const addVideo = video => ({
  type: VIDEO_ADD,
  video
});

export const populatePlaylist = videoArray => ({
  type: POPULATE_PLAYLIST,
  videoArray
});
