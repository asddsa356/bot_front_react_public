
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { configureStore } from './store';
import Chatbot from './components/chatbot'
import './App.css';


const store = configureStore();
const App = () => (
  <Provider store={store}>
    <Chatbot />
  </Provider>
);

// const mapStateToProps = state => ({
//   // authenticated: state.login.authenticated || localStorage.getItem('hash')
//   authenticated: true
// });


export default App;