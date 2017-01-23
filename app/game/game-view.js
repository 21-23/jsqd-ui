import { h, render } from 'preact';

import 'common/styles/reset.styl';
import './game-styles.styl';

import UserPanel from 'common/components/user-panel/user-panel';
import Code from 'common/components/code/code';

render((
    <div className="game-view">
        <UserPanel userName="Player" />
        <Code value="var a = new Object()"/>
    </div>
), document.body);
