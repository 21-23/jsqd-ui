import { h, Component } from 'preact';

import CodeBox from 'common/components/code-box/code-box';

import './participant-input.styl';

function getCorrectClasses(correct) {
    return {
        'participant-input-correct': true,
        [`-${correct}`]: true
    };
}

export default class ParticipantInput extends Component {
    render({ input }) {
        return (
            <div className="participant-input">
                <div className="participant-input-header">
                    <span className="participant-input-name">{input.displayName}</span>
                    <span> - </span>
                    <span className={getCorrectClasses(input.correct)}>{input.correct}</span>
                </div>
                <div className="participant-input-body">
                    <CodeBox value={input.code} />
                </div>
            </div>
        );
    }

    refreshSize() {
        console.log('!!!!');
    }
}
