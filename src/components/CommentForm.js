import { Button, ModalBody, ModalHeader ,Modal ,Label ,Row ,Col} from 'reactstrap';
import React,{Component} from 'react';
import {Control , LocalForm , Errors} from 'react-redux-form';

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
        console.log(JSON.stringify(values));
        alert(JSON.stringify(values))
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
                                <Label htmlFor="yourName" md={12}>Your Name</Label>
                                <Col>
                                    <Control.text name="yourName" id="rating"
                                    model=".yourName" 
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        maxLength: maxLength(15),
                                        minLength:minLength(3)
                                    }}  />
                                    <Errors
                                        className="text-danger"
                                        model=".yourName"
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

export default CommentForm ;