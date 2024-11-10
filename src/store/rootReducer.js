import { combineReducers } from 'redux';
import orderBookReducer from './orderBookSlice';

export default combineReducers({
    orderBook: orderBookReducer,
});
