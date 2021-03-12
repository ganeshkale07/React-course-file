import {Navbar , NavbarBrand} from 'reactstrap';
import './App.css';
import React , { Component } from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';


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
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
