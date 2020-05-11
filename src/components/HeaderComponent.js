import React, { Component } from 'react'
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
    Button, ModalHeader, Modal, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import '../App.css'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
   
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    
    handleLogin(event) {
        this.toggleModal()
        alert('Username: ' + this.username.value + "Password: " + this.password.value
            + 'Remember: ' + this.remember.checked)
        event.preventDefault()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand='md'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className='mr-auto' href='/'>
                            <img src='assets/images/wkulogo.png' height='45' width='45' alt='Ris' />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className='nav-link' to='/home'>
                                        <span className='fa fa-home fa-lg'></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/program'>
                                        <span className='fa fa-list fa-lg'></span> Programs
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/aboutus'>
                                        <span className='fa fa-info fa-lg'></span> About us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/contactus'>
                                        <span className='fa fa-address-card fa-lg'></span> Contact us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className='fa fa-sign-in'>Login</span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-6'>
                                <h1><span className='fa fa-heart fa-lg'></span>  Warm Hearted</h1>
                                <br />
                                <p>
                                We want a platform that can incorporate the public welfare and social network together
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor='username'>Username</Label>
                                <Input type='text' id='username' name='username' 
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input type='password' id='password' name='password' 
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>       
                            <FormGroup>
                                <Label check>
                                    <Input type='checkbox' name='remember' 
                                    innerRef={(input) => this.remember = input} />
                                    <Label>Remember me</Label>
                                </Label>
                            </FormGroup>       
                            <Button type='submit' value='submit' className='primary'>Login</Button>            
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header