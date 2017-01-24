import { combineReducers } from 'redux';

import userPanel from './user-panel';
import currentRound from './current-round';

export default combineReducers({
    userPanel,
    currentRound
});
