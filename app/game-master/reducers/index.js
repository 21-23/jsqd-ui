import { combineReducers } from 'redux';

import session from './session';
import participant from './participant';
import currentRound from './current-round';
import score from './score';

export default combineReducers({
    session,
    participant,
    currentRound,
    score,
});
