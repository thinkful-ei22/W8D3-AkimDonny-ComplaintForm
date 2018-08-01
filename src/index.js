import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Complaint from './components/complaint';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
<Provider store={store}>
    <Complaint />
</Provider>, document.getElementById('root'));
registerServiceWorker();
