import { h, render } from 'preact';

import 'common/styles/reset.styl';
import './game-styles.styl';

import UserPanel from 'common/components/user-panel/user-panel';
import CodeInput from './components/code-input/code-input';
import Code from 'common/components/code/code';

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
            <Code value={JSON.stringify(CONTENT)}/>
            <Code value={Code.toString()}/>
        </div>
        <CodeInput/>
    </div>
), document.body);
