import React from '../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import ReactDOM from '../../../../Library/Caches/typescript/2.9/node_modules/@types/react-dom';
import './index.css';
import Complaint from './components/complaint';
import {Provider} from '../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
<Provider store={store}>
    <Complaint />
</Provider>, document.getElementById('root'));
registerServiceWorker();
