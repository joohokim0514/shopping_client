import { Auth } from './auth';
import { Products } from './products';
import { Reviews } from './reviews';
import { Orders } from './orders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            products: Products,
            reviews: Reviews,
            orders: Orders
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
