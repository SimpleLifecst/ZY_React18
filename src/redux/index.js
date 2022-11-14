import {createStore, combineReducers}from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import paginationReducer from "./reducers/pagination";
import searchReducer from "./reducers/search";
import searcher from "./reducers/searcher";

const allReducers = combineReducers({
  pagination: paginationReducer,
  search: searchReducer,
  searcher
})

export default createStore(allReducers, composeWithDevTools())