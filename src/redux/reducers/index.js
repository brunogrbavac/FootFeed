import { combineReducers } from 'redux';
import darkModeReducer from './darkMode';
import loginReducer from './login';
import galleryReducer from './gallery';
import matchReducer from './toEdit';

const universalReducer = combineReducers({
    darkMode: darkModeReducer,
    login: loginReducer,
    gallery: galleryReducer,
    match: matchReducer,
});

export default universalReducer;