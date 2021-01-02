import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import CountryList from './SideBar/CountryList'
import languages from './SideBar/LanguageList'

export default class EditProfile extends Component {

  

 

  render() {
    return (
      <div className = 'editFormDiv'>
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
              type='selector'
              as='select'
              name='country'
              id='country'
              value={this.props.country}
              onChange={this.props.handleChange}
            >
              {CountryList.map(country => {
                return  (<option>{country.name}</option>)
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='languagesSpoken'>What language/s do you speak fluently? </Form.Label>
            <Dropdown
            placeholder = 'Choose Your Language'
            name='languagesSpoken'
            defaultValue = {this.props.languagesSpoken}
            fluid multiple selection 
             options={languages.map(obj => ({...obj, key:obj.code, text:obj.name, value:obj.name }))}
            onChange = {this.props.handleLanguage}
            />
          </Form.Group>
          
          
          
            <Form.Label htmlFor='languagesLearn'>What language/s are you learning? </Form.Label>
            <Dropdown
            placeholder = 'Choose Your Language'
            name= 'languagesLearn'
            defaultValue = {this.props.languagesLearn}
            fluid multiple selection 
             options={languages.map(obj => ({...obj, key:obj.code, text:obj.name, value:obj.name }))}
            onChange = {this.props.handleLanguage}
            />
          
          
          
          
          
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
            <div className='uploadClass'>
            <Form.Control
              type='file'
              name='picture'
              id='picture'
              // value={this.props.picture}
              onChange={event => this.props.handleFileUpload (event)}
            />
            </div>
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
            <div class='ageClass'>
            <Form.Control
              type='number'
              name='age'
              id='age'
              value={this.props.age}
              onChange={this.props.handleChange}
            />
             </div>
          </Form.Group>
         
          <Button type='submit'>Update Profile</Button>
        </Form>
      </div>
    )
  }
}