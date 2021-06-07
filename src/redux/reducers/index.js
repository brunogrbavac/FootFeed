import { combineReducers } from 'redux';
import offlineReducer from './offline';
import darkModeReducer from './darkMode'

const universalReducer = combineReducers({
    offline: offlineReducer,
    darkMode: darkModeReducer,
});

export default universalReducer;