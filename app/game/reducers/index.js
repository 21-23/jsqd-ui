import { combineReducers } from 'redux';

import game from './game';
import userPanel from './user-panel';
import currentRound from './current-round';

export default combineReducers({
    game,
    userPanel,
    currentRound
});
