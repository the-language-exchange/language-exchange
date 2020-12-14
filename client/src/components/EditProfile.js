import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { login } from '../services/auth.js';
import service from '../services/picture-upload.js';

export default class EditProfile extends Component {

  state = {
    username: '',
    password: '',
    success: '',
    email: '', 
    country: '',
    languagesSpoken: [],
    languagesLearn: [],
    education: '',
    skills: '',
    interests: '',
    picture: '',
    about: '',
    age: 0,
    imageURL: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }); 
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, imageURL, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age } = this.state;
    console.log(imageURL);
    login(username, imageURL, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age)
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
            education: '',
            skills: '',
            interests: '',
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

  // client/src/ProjectForm
  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);

    service.handleUpload(uploadData)
      .then(response => {
        const imageURL = response.secure_url;
        const publicID = response.public_id;
        console.log(response);
        this.setState({ imageURL: imageURL, publicID: publicID });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return (
      <div>
        <h2>Edit Profile</h2>
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='username'>Username: </Form.Label>
            <Form.Control
              type='text'
              id='username'
              name='username'
              value={this.props.username}
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='email'>Email: </Form.Label>
            <Form.Control
              type='text'
              id='email'
              name='email'
              value={this.props.email}
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='country'>Country: </Form.Label>
            <Form.Control
              type='text'
              id='country'
              name='country'
              value={this.props.country}
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='languagesSpoken'>What language/s do you speak fluently? </Form.Label>
            <Form.Control
              type='text'
              name='languagesSpoken'
              id='languagesSpoken'
              value={this.props.languagesSpoken}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='languagesLearn'>What language/s are you learning? </Form.Label>
            <Form.Control
              type='text'
              name='languagesLearn'
              id='languagesLearn'
              value={this.props.languagesLearn}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='education'>Education or Profession: </Form.Label>
            <Form.Control
              type='text'
              name='education'
              id='education'
              value={this.props.education}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='skills'>What skills would you like to share? </Form.Label>
            <Form.Control
              type='text'
              name='skills'
              id='skills'
              value={this.props.skills}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='interests'>What are you interested in? </Form.Label>
            <Form.Control
              type='text'
              name='interests'
              id='interests'
              value={this.props.interests}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='picture'>Upload Profile Picture: </Form.Label>
            <Form.Control
              type='file'
              name='picture'
              id='picture'
              //value={this.state.picture}
              onChange={this.handleFileUpload}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='about'>Introduce yourself: </Form.Label>
            <Form.Control
              type='text'
              name='about'
              id='about'
              value={this.props.about}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='age'>How old are you? </Form.Label>
            <Form.Control
              type='number'
              name='age'
              id='age'
              value={this.props.age}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Button type='submit'>Update Profile</Button>
        </Form>
      </div>
    )
  }
}