import { combineReducers } from 'redux';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { statusReducer } from '@rootstrap/redux-tools';
import session from './sessionReducer';
import api from './apiReducer';
import location from './locationReducer';
import uiReducer from './uiReducer';
import movieFiltersReducer from './movieFiltersReducer';
import showtimeReducer from './showtimeReducer';

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
  whitelist: ['authenticated', 'info', 'user'],
  stateReconciler: autoMergeLevel2
};

const rootReducer = () =>
  combineReducers({
    session: persistReducer(sessionPersistConfig, session),
    statusReducer,
    ui: uiReducer,
    movieFilters: movieFiltersReducer,
    api,
    location,
    showtime: showtimeReducer
  });

export default rootReducer;
