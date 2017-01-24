import { h, render } from 'preact';

import 'common/styles/reset.styl';
import './game-styles.styl';

import UserPanel from 'common/components/user-panel/user-panel';
import CodeEditor from './components/code-editor/code-editor';
import CodeBox from 'common/components/code-box/code-box';

//DATA FOR TEST
const CONTENT = [
    { name: 'Johnie', surname: 'Walker', age: 14 },
    { name: 'Johnie', surname: 'Walker', age: 20 },
    { name: 'Adam', surname: 'Smith', age: 99 },
    { name: 'Jack', surname: 'Daniels', age: 18 },
];

render((
    <div className="game-view">
        <UserPanel userName="Player" />
        <div className='flex-justify-center'>
            <CodeBox value={JSON.stringify(CONTENT)}/>
            <CodeBox value={CodeEditor.toString()}/>
        </div>
        <CodeEditor/>
    </div>
), document.body);
