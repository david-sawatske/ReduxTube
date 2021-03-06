import * as YouTube from '../util/youtube_api_util';

export const START_VIDEO_SEARCH_FETCH = 'START_VIDEO_SEARCH_FETCH';
export const RECEIVE_VIDEO_SEARCH = 'RECEIVE_VIDEO_SEARCH';
export const CLEAR_VIDEO_SEARCH = 'CLEAR_VIDEO_SEARCH';

export const receiveVideoSearch = (videos, playlistIds) => ({
  type: RECEIVE_VIDEO_SEARCH,
  searchResults: videos,
  playlistIds: playlistIds
});

export const startVideoSearchFetch = () => ({
  type: START_VIDEO_SEARCH_FETCH
});

export const clearVideoSearch = () => ({
  type: CLEAR_VIDEO_SEARCH
});

export const requestVideoSearch = term => (dispatch, getState) => {
  const { playlist } = getState().playlist;
  const playlistIds = playlist.map(a => a.id);

  dispatch(startVideoSearchFetch());
  return YouTube.fetchVideoSearch(term).then(videos => {
    dispatch(receiveVideoSearch(videos, playlistIds))
  });
};
