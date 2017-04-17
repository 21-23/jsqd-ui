export function formatScoreTime(time, getDefault = false) {
    if (getDefault || typeof time !== 'number') {
        return '';
    }

    return time.toFixed(1);
};
