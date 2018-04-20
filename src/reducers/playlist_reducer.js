import { combineReducers } from 'redux';

import { VIDEO_REMOVE, VIDEO_ADD  } from '../actions/playlist_actions';

const defState = [];

const playlist = (state = defState, action) => {
  switch (action.type) {
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
