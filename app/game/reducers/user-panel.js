const defaultState = {
    displayName: 'Player',
    iconCharCode: '\uf007',
};

export default function userPanel(state = defaultState, action) {
    switch(action.type) {
        case 'UPDATE_USER_INFO':
            return Object.assign({}, state, { displayName: action.payload.displayName });
        default:
            return state;
    }
}
