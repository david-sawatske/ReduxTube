import { combineReducers } from 'redux';

import PlaylistReducer from './playlist_reducer';
import SearchReducer from './search_reducer';

const RootReducer = combineReducers({
  playlist: PlaylistReducer,
  searched: SearchReducer
});

export default RootReducer;
