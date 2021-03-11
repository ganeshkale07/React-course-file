import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import {List} from 'reactstrap';


     function RenderComments({comments}) {
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


    function RenderDish({dish}) {
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

    const Dishdetail = (props) => {
        const dish = props.dish;
        if (dish == null) {
            return (<div></div>)
        }
        const dishItem = <RenderDish dish={props.dish}/>;
        const commentItem = <RenderComments comments={props.dish.comments} />;
        return (
            <div className="container">    
                <div className='row'>
                    {dishItem}
                    {commentItem}
                </div>
            </div>
        )
    }

export default Dishdetail;