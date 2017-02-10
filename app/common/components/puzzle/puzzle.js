import { h } from 'preact';

import CodeBox from 'common/components/code-box/code-box';

import './puzzle.styl';

export default function Puzzle({ input, expected }) {
    return (
        <div className="puzzle">
            <CodeBox value={input}/>
            <div className="separator"></div>
            <CodeBox value={expected}/>
        </div>
    );
}
