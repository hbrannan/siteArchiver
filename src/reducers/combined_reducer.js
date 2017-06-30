import { combineReducers } from 'redux';
import top_five from './top_five_reducer';
import url from './url_reducer';
import app from './app_reducer';

const combined_reducer = combineReducers({
  app,
  url,
  top_five
});

export default combined_reducer;


// thought: reduce overhead of calling all subreducers for any action : https://github.com/reactjs/reselect
