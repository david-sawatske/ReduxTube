import { combineReducers } from 'redux';

import { VIDEO_REMOVE, VIDEO_ADD  } from '../actions/playlist_actions';
import { RECEIVE_VIDEO_SEARCH } from '../actions/search_actions';

import { merge, union } from 'lodash';

const searchedById = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    return merge({}, getSearchData(action.searchResults.items).byId, state)
  case VIDEO_ADD:
    return state.filter( vid => vid != action.video);
  case VIDEO_REMOVE:
    return [...new Set([action.video, ...state])];
  default:
    return state;
  }
};

const allSearchedIds = (state = [], action) => {
  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    return union([], getSearchData(action.searchResults.items).allIds, state)
  default:
    return state;
  }
};

// START selectors //
const getSearchData = dataArray => {
  const byId = {};
  const allIds = [];

  dataArray.map(obj => {
    if (obj.id) {
      const vidId = (obj.id.videoId);

      allIds.push(vidId);

      byId[vidId] = { ["id"]: vidId,
                      ["title"]: obj.snippet.title,
                      ["description"]: obj.snippet.description,
                      ["thumbnail"]: obj.snippet.thumbnails.high.url }
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
