import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle ,Breadcrumb ,BreadcrumbItem} from 'reactstrap';
import {List} from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';



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
                    <CommentForm />               
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
        const commentItem = <RenderComments comments={props.comments} />;
        return (
            <div className="container">  
                <div className="row">
                    <Breadcrumb>                       
                        <BreadcrumbItem ><Link to="/Menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>  
                <div className='row'>
                    {dishItem}
                    {commentItem}
                    
                </div>
            </div>
        )
    }

export default Dishdetail;