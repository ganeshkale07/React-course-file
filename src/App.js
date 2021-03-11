import {Navbar , NavbarBrand} from 'reactstrap';
import './App.css';
import { Component } from 'react';
import Main from './components/MainComponent';


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
      <Main />
    );
  }
}

export default App;
