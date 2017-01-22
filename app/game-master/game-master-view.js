import { h, render } from 'preact';

import 'common/styles/reset.styl';
import './game-master-styles.styl';

import UserPanel from 'common/components/user-panel/user-panel';

render((
    <div className="game-master-view">
        <UserPanel userName="Game Master" />
    </div>
), document.body);
