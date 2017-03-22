export default {
    name: 'Current round',
    duration: 120,
    remaining: 95,
    input: JSON.stringify([{ name: 'Johnie', surname: 'Walker', age: 14 }, { name: 'Johnie', surname: 'Walker', age: 20 },{ name: 'Adam', surname: 'Smith', age: 99 },{ name: 'Jack', surname: 'Daniels', age: 18 }]),
    expected: JSON.stringify([14, 20, 99, 18]),
    phase: 'idle',
    countdownRemaining: 0,
};
