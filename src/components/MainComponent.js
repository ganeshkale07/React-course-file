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
import { addComment ,fetchDishes ,fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapSateToProps = state => {
      return{
        dishes : state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
      }
}


const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});




//conatiner component with all state 
class Main extends Component{
  constructor (props){
    super(props);

    

  }
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  

  render(){

    const Homepage = () => {
      return(<Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}      
      dishesLoading={this.props.dishes.isLoading}
      dishesErrMess={this.props.dishes.errMess}
      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
      promoLoading={this.props.promotions.isLoading}
      promoErrMess={this.props.promotions.errMess}
      leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>);
    }
   
    const DishWithId = ({match}) => {
        return(
          <Dishdetail  dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId , 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId  ===  parseInt(match.params.dishId , 10))}
          commentsErrMess={this.props.comments.errMess}
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
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
          <Route path="/about" component={AboutUs} />
          <Redirect to="/home"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapSateToProps,mapDispatchToProps)(Main));

