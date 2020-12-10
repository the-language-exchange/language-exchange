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
        <p>Please provide some information about yourself to find a language exchange who shares your interests.</p>
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
          <Form.Group>
            <Form.Label htmlFor='country'>Country: </Form.Label>
            <Form.Control
              type='text'
              name='country'
              id='country'
              value={this.state.country}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='languagesSpoken'>What language/s do you speak fluently? </Form.Label>
            <Form.Control
              type='text'
              name='languagesSpoken'
              id='languagesSpoken'
              value={this.state.languagesSpoken}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='languagesLearn'>What language/s are you learning? </Form.Label>
            <Form.Control
              type='text'
              name='languagesLearn'
              id='languagesLearn'
              value={this.state.languagesLearn}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='education'>Education or Profession: </Form.Label>
            <Form.Control
              type='text'
              name='education'
              id='education'
              value={this.state.education}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='skills'>What skills would you like to share? </Form.Label>
            <Form.Control
              type='text'
              name='skills'
              id='skills'
              value={this.state.skills}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='interests'>What are you interested in? </Form.Label>
            <Form.Control
              type='text'
              name='interests'
              id='interests'
              value={this.state.interests}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='picture'>Upload Profile Picture: </Form.Label>
            <Form.Control
              type='image'
              name='picture'
              id='picture'
              value={this.state.picture}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='about'>Introduce yourself: </Form.Label>
            <Form.Control
              type='text'
              name='about'
              id='about'
              value={this.state.about}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='age'>How old are you? </Form.Label>
            <Form.Control
              type='number'
              name='age'
              id='age'
              value={this.state.age}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.success && (
            <Alert variant='danger'>{this.state.success}</Alert>
          )}
          <Button type='submit'>Signup</Button>
        </Form>
      </>
    )
  }
}

