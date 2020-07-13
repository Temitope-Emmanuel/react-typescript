import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./Routes"
import {Provider} from "react-redux"
import {Store} from "redux" 

import configureStore,{IApplicationState} from "./Store"
// import configureStore from './Store';

interface IProps {
  store:Store<IApplicationState>
}
const Root:React.SFC<IProps> = props => {
  return(
    <Provider store={props.store}>
      <Routes/>
    </Provider>
  )
}

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Root store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);