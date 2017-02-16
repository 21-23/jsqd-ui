const defaultState = {
    round: [
        { displayName: 'John Wick', participantId: 'qwe-asd-zxc', time: 25, length: 43, correct: true },
        { displayName: 'Cat Simon', participantId: 'qwe-543-zxc', time: 43, length: 32, correct: true },
        { displayName: 'Donald Trump', participantId: '098-423-qwe', time: 148, length: 320, correct: false },
        { displayName: 'Jack Daniels', participantId: 'dad-423-qwe', time: 148, length: 4, correct: false },
        { displayName: 'Owl', participantId: 'dad-423-cds', time: 148, length: 402, correct: false },
    ],
    aggregate: [],
};

export default function participant(state = defaultState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
