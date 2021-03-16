import {Navbar , NavbarBrand} from 'reactstrap';
import './App.css';
import React , { Component } from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';//providing state form store to app.js
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component{
  
  /**app component do not handling any state nor pass any prop **/

  // constructor (props){
  //   super(props);

  //   this.state = {
  //     dishes :DISHES
  //   }
  // }


  render(){
    return(
     <Provider store={store}>
        <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
     </Provider>
      
    );
  }
}

export default App;
