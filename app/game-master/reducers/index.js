import { combineReducers } from 'redux';

import session from './session';
import participant from './participant';
import currentRound from './current-round';

export default combineReducers({
    session,
    participant,
    currentRound,
});
