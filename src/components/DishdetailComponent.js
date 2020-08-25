import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
   Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderDish({dish}) {
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

    class CommentForm extends Component{
        
        constructor(props){
            super(props);

            this.state = {
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
        }
    

        render(){
            return(
                <React.Fragment>
                   
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <div className="container">
                               
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" >Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Row>   
                                    <Row className="form-group">
                                        <label htmlFor="name">Your Name</label>
                                        <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                         className="text-danger"
                                         model=".name"
                                         show="touched"
                                         messages={{
                                             required: ' Required!',
                                             minLength: 'This field should at least be three characters long.',
                                             maxLength: 'This field should be less than or equal to 15 characters.'
                                         }} />
                                    </Row>
                                    <Row className="form-group">
                                        <label htmlFor="comment">Comment</label>
                                        <Control.textarea model=".comment" name="comment" id="comment" 
                                        rows="6" className="form-control" />
                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Row>
                                </LocalForm>
                                </div>
                            </ModalBody>
                        </Modal>
                    
                <Button outline color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil "></span> Submit Comment</Button>
                </React.Fragment>
            );
        }
    }

    function RenderComment({comments}){
        if( comments != null){

            const COMMENTS = comments.map( (COMMENT) => {
            return(  
                <ul key={COMMENT.id} className="list-unstyled">
                    <li className="mt-3 mb-1">{COMMENT.comment}</li>
                    <li className="mt-3">-- {COMMENT.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(COMMENT.date)))}</li>
                </ul>
                );
            });

            return (
                <div >
                    <h4>Comments</h4>
                    {COMMENTS}
                    <CommentForm />
                </div>
            );
        
        }
        else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment comments={props.comments} />
                       
                    </div>
                </div>
                </div>
        );
        
    }


export default DishDetail;