const NOT_VALID_SYMBOLS = '(){};:,';

export function isNewLineEvent(event) {
    const { origin, removed, text } = event;

    return (origin === '+input' || origin === '+delete') && removed[0] === '' && text[0] === '';
}

export function isValidSymbol(symbol) {
    return NOT_VALID_SYMBOLS.indexOf(symbol) === -1;
}
