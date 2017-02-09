import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import 'common/styles/reset.styl';
import './game-master-styles.styl';

import GameMasterApp from './components/GameMasterApp';

import store from './store/store';

render((
    <Provider store={store}>
        <GameMasterApp />
    </Provider>
), document.body);
