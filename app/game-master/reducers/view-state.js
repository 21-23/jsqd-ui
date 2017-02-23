const { SWITCH_VISIBLE_SCORE } = require('../actions/view-state');

const VisibleScore = {
    ROUND: 'round',
    AGGREGATE: 'aggregate',
};

const defaultState = {
    visibleScore: VisibleScore.ROUND,
};

function updateVisibleScore(state) {
    const visibleScore = state.visibleScore === VisibleScore.ROUND ? VisibleScore.AGGREGATE : VisibleScore.ROUND;

    return Object.assign({}, state, {
        visibleScore,
    });
}

export default function viewState(state = defaultState, action) {
    switch(action.type) {
        case SWITCH_VISIBLE_SCORE:
            return updateVisibleScore(state);
        default:
            return state;
    }
}
