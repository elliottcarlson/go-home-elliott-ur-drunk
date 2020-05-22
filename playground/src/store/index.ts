import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import BACTrackReducer from './BACTrack/reducer';
import BACTrackMiddleware from './BACTrack/middleware';

const rootReducer = combineReducers({
  BACTrackState: BACTrackReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const index = {
    ...createStore(rootReducer, composeEnhancers(applyMiddleware(BACTrackMiddleware)))
};

export default index;
