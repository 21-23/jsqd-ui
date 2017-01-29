import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import 'common/styles/reset.styl';
import './game-styles.styl';

import GameApp from './components/GameApp';

import store from './store/store';

render((
    <Provider store={store}>
        <GameApp />
    </Provider>
), document.body);
