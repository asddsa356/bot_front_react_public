import { combineReducers } from 'redux';
import chatbot from '../reducers/chatbot-reducer';

export const rootReducer = combineReducers({
  chatbot
});
