import { combineReducers } from 'redux';

import dashboardReducer from '../components/dashboard/dashboardSlice';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
})

export default rootReducer;