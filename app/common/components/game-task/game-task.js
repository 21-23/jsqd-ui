import { h } from 'preact';

import CodeBox from 'common/components/code-box/code-box';

import './game-task.styl';

export default function GameTask({ source, target }) {
    return (
        <div className="game-task">
            <CodeBox value={source}/>
            <div className="separator"></div>
            <CodeBox value={target}/>
        </div>
    );
}
