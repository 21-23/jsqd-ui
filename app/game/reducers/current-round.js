import { connect } from 'preact-redux';

const defaultState = {
    name: 'Current round',
    duration: 120,
    remaining: 95,
    taskSource: JSON.stringify([{ name: 'Johnie', surname: 'Walker', age: 14 }, { name: 'Johnie', surname: 'Walker', age: 20 },{ name: 'Adam', surname: 'Smith', age: 99 },{ name: 'Jack', surname: 'Daniels', age: 18 }]),
    taskTarget: JSON.stringify([14, 20, 99, 18])
};

export default function currentRound(state = defaultState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
