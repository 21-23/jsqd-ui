const defaultState = {
    displayName: 'Player',
    role: 'player'
};

export default function userInfo(state = defaultState, action) {
    switch(action.type) {
        case 'UPDATE_USER_INFO':
            return Object.assign({}, state, {
                displayName: action.payload.displayName,
                role: action.payload.role,
            });
        default:
            return state;
    }
}
