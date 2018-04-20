import { combineReducers } from 'redux';

import { VIDEO_REMOVE, VIDEO_ADD  } from '../actions/playlist_actions';
import { RECEIVE_VIDEO_SEARCH } from '../actions/search_actions';

import { merge, union, omit } from 'lodash';

const searchedById = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    return merge({}, getSearchData(action.searchResults.items).byId, state)
  case VIDEO_ADD:
    return omit(state, action.video.id)
  case VIDEO_REMOVE:
    const videoObj = { [action.video.id]: action.video }

    return merge({}, videoObj, state)
  default:
    return state;
  }
};

const allSearchedIds = (state = [], action) => {
  Object.freeze(state)

  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    return union([], getSearchData(action.searchResults.items).allIds, state)
  case VIDEO_ADD:
    return state.filter( videoId => videoId != action.video.id);
  case VIDEO_REMOVE:
    return union([], state, [action.video.id])
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
