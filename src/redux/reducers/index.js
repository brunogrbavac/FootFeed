import { combineReducers } from 'redux';
import darkModeReducer from './darkMode';
import loginReducer from './login';
import galleryReducer from './gallery';

const universalReducer = combineReducers({
    darkMode: darkModeReducer,
    login: loginReducer,
    gallery: galleryReducer,
});

export default universalReducer;