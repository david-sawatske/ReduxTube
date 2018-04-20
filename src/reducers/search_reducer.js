import { combineReducers } from 'redux';

import { RECEIVE_VIDEO_SEARCH } from '../actions/search_actions';

import { merge, union } from 'lodash';

const searchedById = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    return merge({}, getSearchData(action.searchResults.items).byId)
  default:
    return state;
  }
};

const allSearchedIds = (state = [], action) => {
  switch (action.type) {
  case RECEIVE_VIDEO_SEARCH:
    return merge({}, getSearchData(action.searchResults.items).allIds)
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
