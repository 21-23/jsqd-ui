export function formatScoreTime(time) {
    if (typeof time !== 'number') {
        return '';
    }

    return time.toFixed(1);
};
