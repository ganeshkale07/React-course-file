import {Navbar , NavbarBrand} from 'reactstrap';
import { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'
import { DISHES } from '../shared/dishes.js';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Redirect, Route, Switch } from 'react-router';



//conatiner component with all state 
class Main extends Component{
  constructor (props){
    super(props);

    this.state = {
      dishes :DISHES
      
    }
  }

  

  render(){
    const Homepage = () => {
      return(<Home />);
    }
    return(
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage}></Route>
          <Route path="/menu" component={() => <Menu dishes={this.state.dishes}/>}></Route>
          <Redirect to="/home"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
