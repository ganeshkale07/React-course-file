import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import {List} from 'reactstrap';

class Dishdetail extends Component {
    renderComments(comments) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmt = comments.map(comment => {
            return (
                <List type="unstyled">
                    <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                    </li>
                </List>
                
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comment </h4>               
                    {cmt}               
            </div>
        )
    }
    renderDish(dish) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
    render() {
        const dish = this.props.dish;
        if (dish == null) {
            return (<div></div>)
        }
        const dishItem = this.renderDish(dish);
        const commentItem = this.renderComments(dish.comments);
        return (
            <div className='row'>
                {dishItem}
                {commentItem}
            </div>
        )
    }
}
export default Dishdetail