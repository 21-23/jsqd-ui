import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import { initSteno } from 'steno';

import 'common/styles/reset.styl';
import './game-master-styles.styl';

import GameMasterApp from './components/GameMasterApp';

import store from './store/store';

initSteno('ui-game-master');

render((
    <Provider store={store}>
        <GameMasterApp />
    </Provider>
), document.body);
