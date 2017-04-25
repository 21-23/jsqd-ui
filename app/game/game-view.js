import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import { initSteno } from 'steno';

import 'common/styles/reset.styl';
import './game-styles.styl';

import GameApp from './components/GameApp';

import store from './store/store';

initSteno('ui-game');

render((
    <Provider store={store}>
        <GameApp />
    </Provider>
), document.body);
