import { createAction } from 'redux-actions';
import {
    PARTICIPANT_JOINED,
    PARTICIPANT_LEFT,
    PARTICIPANT_SOLUTION
} from '../actions/score';

export const addNewParticipant = createAction(PARTICIPANT_JOINED);
export const removeParticipant = createAction(PARTICIPANT_LEFT);
export const updateParticipantSolution = createAction(PARTICIPANT_SOLUTION);
