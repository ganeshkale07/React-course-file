import {Form, Navbar , NavbarBrand} from 'reactstrap';
import { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Redirect, Route, Switch ,withRouter } from 'react-router';
import About from './AboutComponent';
import { connect } from "react-redux";
//action available in main
import { addComment } from '../redux/ActionCreators';

const mapSateToProps = state => {
      return{
        dishes : state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
      }
}


const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

//conatiner component with all state 
class Main extends Component{
  constructor (props){
    super(props);

    
  }

  

  render(){

    const Homepage = () => {
      return(<Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
      leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>);
    }
   
    const DishWithId = ({match}) => {
        return(
          <Dishdetail  dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId , 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId  ===  parseInt(match.params.dishId , 10))}
          addComment={this.props.addComment} /> 
        );
    }

    const AboutUs = () =>{
      return (
        <About leaders={this.props.leaders}/>
      );
    }

    return(
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage}></Route>
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}></Route>
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

export default withRouter(connect(mapSateToProps,mapDispatchToProps)(Main));

