import { combineReducers } from 'redux';

import game from './game';
import userInfo from './user-info';
import currentRound from './current-round';

export default combineReducers({
    game,
    userInfo,
    currentRound
});
