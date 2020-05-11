import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    ModalHeader, Modal, ModalBody, Row, Label
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || val.length <= len
const minLength = (len) => (val) => (val) && val.length >= len

class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleComment(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <>
            <Button outline onClick={this.toggleModal}>
                <span className='fa fa-pencil'>Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <div className='container'>
                    <LocalForm onSubmit={(values) => this.handleComment(values)}>
                        <Row className='form-group'>
                            <Label htmlFor='rating'>Rating</Label>
                            <Control.select 
                                className='form-control'
                                type='select' id='rating' name='rating' model='.rating'
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Control.select>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor='name'>Your Name</Label>
                            <Control.text id='name' name='name'
                                model='.author'
                                className='form-control'
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors 
                                className='text-danger'
                                model='.name'
                                show='touched'
                                messages={{
                                    required: 'Required ',
                                    minLength: 'Must be greater than 2 characters ',
                                    maxLength: 'Must be less than 16 characters '
                                }}
                            />
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor='comment'>Comment</Label>
                            <Control.textarea id='comment' name='comment' rows='10'
                                className='form-control'
                                model='.comment'
                                validators={{required}}
                            />
                            <Errors 
                                className='text-danger'
                                model='.comment'
                                show='touched'
                                messages={{
                                    required: 'Required ',
                                }}
                            />                            
                        </Row>
                        <Button type='submit' value='submit' className='primary'>Submit</Button>
                    </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
            </>
        )
    }

}

const Dishdetail = (props) => {
    if (props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    } else if (props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )      
    } else if (props.dish != null) {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments 
                        comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        ) 
    } else return(
        <div />
    )
}

function RenderDish({ dish }) {
    if (dish) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) trnslateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width='100%' object src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments) {
            const format = { year: 'numeric', month: 'short', day: '2-digit' }
            return (
                <>
                <ul className='list-unstyled text-left'>
                    <Stagger in>
                        {comments.map((comment) => {
                            const date = new Date(Date.parse(comment.date))
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-us', format).format(date)}</p>
                                </li>
                                </Fade>
                        )})}
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </Stagger>
                </ul>
                </>
            )
        }
    else {
        return (
            <div>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    }
}


export default Dishdetail