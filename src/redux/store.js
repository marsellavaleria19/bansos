import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducers from './reducers';
import promise from 'redux-promise-middleware';

export default () => {
   const store = createStore(rootReducers, applyMiddleware(promise, logger));
   return {store};
};