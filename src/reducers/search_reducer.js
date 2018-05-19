import { combineReducers } from 'redux';

import { VIDEO_REMOVE, VIDEO_ADD  } from '../actions/playlist_actions';
import { CLEAR_VIDEO_SEARCH,
         RECEIVE_VIDEO_SEARCH } from '../actions/search_actions';

import { merge, union, omit } from 'lodash';

const searchedById = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    const { searchResults, playlistIds } = action;
    const { items } = searchResults;

    return merge({}, getSearchData(items, playlistIds).byId, state)
  case VIDEO_ADD:
    return omit(state, action.video.id);
  case VIDEO_REMOVE:
    const videoObj = { [action.video.id]: action.video }

    return merge({}, videoObj, state);
  case CLEAR_VIDEO_SEARCH:
    return {};
  default:
    return state;
  }
};

const allSearchedIds = (state = [], action) => {
  Object.freeze(state)

  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    const { searchResults, playlistIds } = action;
    const { items } = searchResults;

    return union([], getSearchData(items, playlistIds).allIds, state)
  case VIDEO_ADD:
    return state.filter( videoId => videoId != action.video.id);
  case VIDEO_REMOVE:
    return union([], state, [action.video.id]);
  case CLEAR_VIDEO_SEARCH:
    return [];
  default:
    return state;
  }
};

// START selectors //
const getSearchData = (dataArray, playlistIds = []) => {
  const byId = {};
  const allIds = [];

  dataArray.map(obj => {
    if (obj.id) {
      const vidId = (obj.id.videoId);

      if (!playlistIds.includes(vidId)) {
        allIds.push(vidId);

        byId[vidId] = { ["id"]: vidId,
                        ["title"]: obj.snippet.title,
                        ["description"]: obj.snippet.description,
                        ["thumbnail"]: obj.snippet.thumbnails.high.url }
      }
    }
  })

  return {
    byId: byId,
    allIds: allIds
  }
}
// END selectors //

const SearchReducer = combineReducers({
  searchedById,
  allSearchedIds
});

export default SearchReducer;
