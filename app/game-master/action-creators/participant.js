import { createAction } from 'redux-actions';

import { PARTICIPANT_INFO } from '../actions/participant';

export const updateParticipantInfo = createAction(PARTICIPANT_INFO);
