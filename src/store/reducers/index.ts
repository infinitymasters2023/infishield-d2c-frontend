// store/reducers/index.ts
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  carts: cartReducer,
  authUser: authReducer,
});

export default rootReducer;