import { combineReducers } from 'redux';

import { POPULATE_PLAYLIST, VIDEO_REMOVE,
         VIDEO_ADD  } from '../actions/playlist_actions';

const playlist = (state = [], action) => {
  Object.freeze(state)

  switch (action.type) {
  case POPULATE_PLAYLIST:
    return action.videoArray;
  case VIDEO_REMOVE:
    return state.filter( vid => vid != action.video);
  case VIDEO_ADD:
    return [...new Set([...state, action.video])];
  default:
    return state;
  }
};

const PlaylistReducer = combineReducers({
  playlist
});


export default PlaylistReducer;
