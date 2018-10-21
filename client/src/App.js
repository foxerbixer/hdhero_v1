import React, { Component } from 'react'
import { Provider }  from 'react-redux'
import Root from './components/Root'
import store from './redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import './firebase/config'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history} >
            <Root  />
          </ConnectedRouter>  
        </Provider>
      </div>
    );
  }
}

export default App
