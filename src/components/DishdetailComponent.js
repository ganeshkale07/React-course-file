import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle ,Breadcrumb ,BreadcrumbItem,Button, ModalBody, ModalHeader ,Modal ,Label ,Row ,Col} from 'reactstrap';
import {List} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control , LocalForm , Errors} from 'react-redux-form';
import {Loading}  from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform , Stagger , Fade} from 'react-animation-components';

const required =(val) => val && val.length ; 
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor (props){
        super(props);

        this.state = {
            isModalOpen : false
        }

        this.modalOpener = this.modalOpener.bind(this);
    }

    modalOpener(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.modalOpener();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }


    render(){
        return(
            
                <div className="col-12 col-md-6 m-1 ">
                <Button outline  onClick={ this.modalOpener}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.modalOpener}>
                    <ModalHeader toggle={this.modalOpener}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col>
                                    <Control.select name="rating" id="rating"
                                    model=".rating" 
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                                </Col>

                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col>
                                    <Control.text name="author" id="author"
                                    model=".author" 
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        maxLength: maxLength(15),
                                        minLength:minLength(3)
                                    }}  />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col> 

                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col>
                                    <Control.textarea name="comment" id="comment" model=".comment"
                                    className="form-control" rows="12" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={2}>
                                     <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>

                </Modal>
                </div>
           
        )
    }

}


     function RenderComments({comments,postComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmt = comments.map(comment => {
            return (
                <Stagger in >
                    <List type="unstyled">
                        <Fade in>                        
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
                        </Fade>                       
                    </List>
                </Stagger>
                                        
                
                
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comment </h4>               
                    {cmt}
                    <CommentForm dishId={dishId} postComment={postComment} />               
            </div>
        )
    }


    function RenderDish({dish}) {
         if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const Dishdetail = (props) => {
        const dish = props.dish;
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        
        if (dish == null) {
            return (<div></div>)
        }
        const dishItem = <RenderDish dish={props.dish}/>;
        const commentItem = <RenderComments comments={props.comments}
        postComment={props.postComment}
        dishId={props.dish.id} />;
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



