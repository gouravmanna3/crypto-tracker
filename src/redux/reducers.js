import { combineReducers } from 'redux';

import dashboardReducer from '../components/dashboard/dashboardSlice';
import appReducer from '../AppSlice';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  app: appReducer
})

export default rootReducer;