import {createStore, combineReducers, applyMiddleware} from '../../../../Library/Caches/typescript/2.9/node_modules/redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from '../../../../Library/Caches/typescript/2.9/node_modules/@types/redux-form';

export default createStore(
    combineReducers({
        form: formReducer
    }),
   applyMiddleware(thunk)
);
