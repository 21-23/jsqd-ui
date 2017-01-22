import { h, render } from 'preact';

import 'common/styles/reset.styl';
import './game-styles.styl';

import UserPanel from 'common/components/user-panel/user-panel';

render((
    <div className="game-view">
        <UserPanel userName="Player" />
    </div>
), document.body);
