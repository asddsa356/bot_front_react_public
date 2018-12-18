import {
  INIT_SUCCESS, INIT_FAILED,
  FETCH_MESSAGES_START, FETCH_MESSAGES_FAILED, FETCH_MESSAGES_SUCCESS,
  SEND_PICTURE_START, SEND_PICTURE_SUCCESS, SEND_PICTURE_FAILED,
  SEND_FORM_START, SEND_FORM_FAILED, SEND_FORM_SUCCESS
} from '../constant/chatbot-consts';

const initialState = {
  session_id: 0,
  messages: [],
};
 

export default function chatBotReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      return { ...state, messages: [...state.messages,action.payload], session_id:action.session_id };
      case INIT_FAILED:
      return state;  
      case FETCH_MESSAGES_START:
      return state;  
      case FETCH_MESSAGES_SUCCESS:
      return { ...state, messages: state.messages.concat(action.payload) }
      case FETCH_MESSAGES_FAILED:
      return state;  
      case SEND_FORM_START:
      return state;  
      case SEND_FORM_SUCCESS:
      return { ...state, messages: [...state.messages,action.payload] }
      case SEND_FORM_FAILED:
      return { ...state, messages: [...state.messages,action.payload] }
      case SEND_PICTURE_START:
      return { ...state, messages: [...state.messages,action.payload] };
      case SEND_PICTURE_SUCCESS:
      return state;
      case SEND_PICTURE_FAILED:
      return { ...state, messages: [...state.messages,action.payload]};
  }
  return state;
}
