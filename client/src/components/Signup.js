import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { signup } from '../services/auth.js';

export default class Signup extends Component {

  state = {
    username: '',
    password: '',
    success: '',
    email: '', 
    country: '',
    languagesSpoken: [],
    languagesLearn: [],
    education: [],
    skills: [],
    interests: [],
    picture: '',
    about: '',
    age: 0
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }); 
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    signup(username, password)
      .then(data => {
        if (data.success) {
          this.setState({
            success: data.success,
            username: '',
            password: '',
            email: '', 
            country: '',
            languagesSpoken: [],
            languagesLearn: [],
            education: [],
            skills: [],
            interests: [],
            picture: '',
            about: '',
            age: 0
          })
        } else {
          // put the user in the state of App.js
          this.props.setUser(data);
          this.props.history.push('./');
        }
      })
  }

  render() {
    return (
      <>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='username'>Username: </Form.Label>
            <Form.Control
              type='text'
              name='username'
              id='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Password: </Form.Label>
            <Form.Control
              type='password'
              name='password'
              id='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='email'>Email: </Form.Label>
            <Form.Control
              type='email'
              name='email'
              id='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.messate && (
            <Alert variant='danger'>{this.state.message}</Alert>
          )}
          <Button type='submit'>Signup</Button>
        </Form>
      </>
    )
  }
}

