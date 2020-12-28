import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { signup } from '../services/auth.js';
import service from '../services/picture-upload.js';
import LanguageSignup from './LanguageSignup'
import CountryList from './SideBar/CountryList'




// const data = [{value: language, selected : true}]
// console.log(language)

export default class Signup extends Component {

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

 handleLanguage = (event, data) => {
   this.setState({
     [data.name]:data.value
   })
 }

  handleSubmit = event => {
    event.preventDefault();
    const { username, imageURL, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age } = this.state;
    console.log(imageURL);
    signup(username, imageURL, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age)
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

  getSelectedItems = (events) => {
    console.log(events)
  }


  render() {
    return (
      <div className = 'signupDiv'>
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
              type='selector'
              as='select'
              name='country'
              id='country'
              value={this.state.country}
              onChange={this.handleChange}
            >
              {CountryList.map(country => {
                return  (<option>{country.name}</option>)
              })}          
            </Form.Control>
          </Form.Group>


          {/* <Form.Group>
            <Form.Label htmlFor='languagesSpoken'>What language/s do you speak fluently? </Form.Label>
            <Form.Control
              type='selector'
              as='select'
              multiple
              name='languagesSpoken'
              id='languagesSpoken'
              value={this.state.languagesSpoken}
              onChange={this.handleChange}
            >
             {LanguageList.map(language => {
                return  (<option value ={language.name}>{language.name}</option>)
              })}

            </Form.Control>
          </Form.Group> */}

         
    
            <Form.Group>
            <Form.Label htmlFor='LanguagesSignup'>What language/s do you speak fluently? </Form.Label>
            <LanguageSignup 
            value = {this.state.languagesSpoken} 
            name= {'languagesLearn'} 
            update = {this.handleLanguage}
            />
            </Form.Group>
         
            <Form.Group>
            <Form.Label htmlFor='LanguagesSignup'>What language/s are you learning? </Form.Label>
            <LanguageSignup 
            value = {this.state.languagesLearn} 
            name = {'languagesSpoken'}
            update = {this.handleLanguage}
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
            <div className='uploadClass'>
            <Form.Control
              type='file'
              name='picture'
              id='picture'
              //value={this.state.picture}
              onChange={this.handleFileUpload}
            />
            </div>
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
            <div className='ageClass'>
            <Form.Control
              type='number'
              name='age'
              id='age'
              
              value={this.state.age}
              onChange={this.handleChange}
            />
             </div>
          </Form.Group>
         

          {this.state.success && (
            <Alert variant='danger'>{this.state.success}</Alert>
          )}
          <Button type='submit'>Signup</Button>
        </Form>
      </div>
    )
  }
}

