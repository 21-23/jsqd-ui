import { combineReducers } from 'redux';

import session from './session';
import participant from './participant';
import currentRound from './current-round';
import score from './score';
import viewState from './view-state';
import participantPopUps from './participant-pop-ups';

export default combineReducers({
    session,
    participant,
    currentRound,
    score,
    viewState,
    participantPopUps,
});
