import {Form, Navbar , NavbarBrand} from 'reactstrap';
import { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'
import { DISHES } from '../shared/dishes.js';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Redirect, Route, Switch } from 'react-router';
import About from './AboutComponent';



//conatiner component with all state 
class Main extends Component{
  constructor (props){
    super(props);

    this.state = {
      dishes :DISHES,
      promotions : PROMOTIONS,
      leaders:LEADERS,
      comments:COMMENTS
      
    }
  }

  

  render(){

    const Homepage = () => {
      return(<Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
      leader={this.state.leaders.filter((leader) => leader.featured)[0]}/>);
    }
   
    const DishWithId = ({match}) => {
        return(
          <Dishdetail  dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId , 10))[0]}
          comments={this.state.comments.filter((comment) => comment.dishId  ===  parseInt(match.params.dishId , 10))} /> 
        );
    }

    const AboutUs = () =>{
      return (
        <About leaders={this.state.leaders}/>
      );
    }

    return(
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage}></Route>
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}></Route>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Route path="/about" component={AboutUs} />
          <Redirect to="/home"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
