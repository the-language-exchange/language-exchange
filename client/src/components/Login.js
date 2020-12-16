import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { login } from '../services/auth';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    success: ''
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password).then(data => {
      if (data.success) {
        this.setState({
          success: data.success,
          username: '',
          password: ''
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push('/');
      }
    });
  };

  render() {
    return (
      <div className="loginDiv">
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='username'>Username: </Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              id='username'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Password: </Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              id='password'
            />
          </Form.Group>
          {this.state.success && (
            <Alert variant='danger'>{this.state.success}</Alert>
          )}
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    );
  }
}