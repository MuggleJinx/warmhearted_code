import React, { Component } from 'react';
import { Card, CardImg, CardText,CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) =>(val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        console.log("Current state is : " + JSON.stringify(values));
        alert("Current state is : " + JSON.stringify(values));
    }

    render () {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span> SubmitComment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="container">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                            </Row>
                            <Row>
                                <Label htmlFor="firstname">Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                     className="form-control" placeholder="Your Name" 
                                     validators = {{
                                         required, minLength: minLength(3), maxLength: maxLength(15)
                                     }} />
                                    <Errors className="text-danger"
                                        model=".yourname" show="touched"
                                        messages = {{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 or less characters'
                                        }}
                                    />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message">Comment</Label>
                                    <Control.textarea model=".textarea" id="message" name="message" rows="6" 
                                    className="form-control" />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
        function RenderDish({dish}) {
                return (
                    <div className="col-12 col-md-5 m-2">
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt="{this.props.dish.name}"/>
                        <CardBody>
                            <CardTitle><h4>{dish.name}</h4></CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </div>
                );
        }
        function RenderCmts({comments}){
            if(comments != null) {
                console.log(comments);
            return (
                <div className="col-12 col-md-5 m-2">
                    {/* <Card> */}
                    <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {comments.map((com) => {
                                return (
                                    <li key={com.id} >
                                        <p>{com.comment}</p>
                                        <p>--{com.author}, {new Intl.DateTimeFormat('en-us', {year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                                    </li>
                                );
                            })}
                        </ul>
                        <CommentForm />
                    {/* </Card> */}
                </div>
            );
            } else
                return (
                    <div></div>
                )
        }
        const DishDetails = (props) => {
            if(props.dish != null)
            {
                return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>Menu</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <RenderDish dish = {props.dish} />
                            <RenderCmts comments = {props.comments} />
                        </div>
                    </div>
                )
            } else 
            {
                return (
                    <div></div>
                );
            }
    }

export default DishDetails