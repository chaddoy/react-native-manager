import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';

import Router from './Router';

console.ignoredYellowBox = ['Setting a timer'];

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDVpmG46VBSoAimt_ERSX7mLq7KWyThUTM',
      authDomain: 'manager-27f5d.firebaseapp.com',
      databaseURL: 'https://manager-27f5d.firebaseio.com',
      projectId: 'manager-27f5d',
      storageBucket: 'manager-27f5d.appspot.com',
      messagingSenderId: '902935260639',
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
