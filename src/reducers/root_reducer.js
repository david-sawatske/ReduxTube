import { combineReducers } from 'redux';

import SearchReducer from './search_reducer';

const RootReducer = combineReducers({
  searched: SearchReducer
});

export default RootReducer;
