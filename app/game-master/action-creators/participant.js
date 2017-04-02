import { createAction } from 'redux-actions';

import {
    PARTICIPANT_JOINED,
    PARTICIPANT_LEFT,
} from '../actions/participant';

export const addNewParticipant = createAction(PARTICIPANT_JOINED);
export const removeParticipant = createAction(PARTICIPANT_LEFT);
