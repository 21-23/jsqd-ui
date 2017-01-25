const defaultState = {
    status: 'active',
    currentRoundIndex: 1,
    rounds: [
        { name: 'Round 0' },
        { name: 'Round 1' },
        { name: 'Round 2' },
    ]
};

export default function game(state = defaultState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
