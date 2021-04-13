import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from './provide/Provider';
import reducer, { initialState } from './reducer/reducer';
import { SoundLayer } from './provide/soundProvider';
import sounReducer, { soundInitialState } from './reducer/soundReducer';

ReactDOM.render(
  <React.StrictMode>
    <Provider initialState={initialState} reducer={reducer}>
      <SoundLayer initialState={soundInitialState} reducer={sounReducer}>
        <App />
      </SoundLayer>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
