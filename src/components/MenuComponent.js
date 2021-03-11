import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import Dishdetail from './DishdetailComponent';


class Menu extends Component {
    // initialize the state
    constructor(props) { 
        super(props);
        this.state = {
            selectedDish: null
        };
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish}); 
    }
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div> 
            );
    }
    // returns what needs to be displayed in the UI
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1"> 
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });
        return (
          <div className="container">
            <div className="row">
                  {menu}
            </div>
            {/* <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.state.selectedDish)}
                  </div>
            </div> */}
            <Dishdetail dish={this.state.selectedDish}/>
          </div>
        );
    }
}
export default Menu;