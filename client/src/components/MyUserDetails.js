import React, { Component } from 'react'
import axios from 'axios';
import service from '../services/picture-upload.js';
import { Button, Card , Spinner} from 'react-bootstrap';
import EditProfile from './EditProfile';
import { Link } from 'react-router-dom'


export default class MyUserDetails extends Component {
  state = {
    user: null,
    username: '',
    email: '',
    id: '',
    country: '',
    languagesSpoken: [],
    languagesLearn: [],
    education: [],
    skills: [],
    interests: [],
    picture: '',
    about: '',
    age: 0,  
    editForm: false,
    showDetails: true,
    imageURL : ''

  }

  getData = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/users/${id}`)
    .then(response => {
      this.setState({ 
        user: response.data,
        username: response.data.username,
        email: response.data.email,
        id: response.data._id,
        country: response.data.country,
        languagesSpoken: response.data.languagesSpoken,
        languagesLearn: response.data.languagesLearn,
        education: response.data.education,
        skills: response.data.skills,
        interests: response.data.interests,
        picture: response.data.picture,
        imageURL: response.data.picture,
        about: response.data.about,
        age: response.data.age,
      })
      console.log(id)

    console.log(response.data)
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  toggleEditForm = () => {
    this.setState((prevState) => ({
      editForm: !prevState.editForm,
      showDetails: !prevState.showDetails
    }))
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleLanguage = (event, data) => {
    this.setState({
      [data.name]:data.value
    })
  }
  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    console.log('pic upload', this.state.imageURL)
    axios.put(`/api/users/${id}`, {
      username: this.state.username,
      email: this.state.email,
      id: this.state.id,
      country: this.state.country,
      languagesSpoken: this.state.languagesSpoken,
      languagesLearn: this.state.languagesLearn,
      education: this.state.education,
      skills: this.state.skills,
      interests: this.state.interests,
      picture: this.state.imageURL,
      about: this.state.about,
      age: this.state.age

    })
    .then(response => {
      this.setState({
        user: response.data,
        username: response.data.username,
        email: response.data.email,
        id: response.data._id,
        country: response.data.country,
        languagesSpoken: response.data.languagesSpoken,
        languagesLearn: response.data.languagesLearn,
        education: response.data.education,
        skills: response.data.skills,
        interests: response.data.interests,
        picture: response.data.picture,
        about: response.data.about,
        age: response.data.age,       
        editForm: false,
        showDetails: true
      })
    })
    .catch(err => {
      console.log(err);
    })
}


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
    if (!this.state.user) 
    return (
        <div className='spinner'>
        <Spinner animation="border" role="status" >
        <span className="sr-only">Loading...</span>
        </Spinner>
        </div>
    )
    return ( 
         <>

        {this.state.showDetails && (
    
          <div className='profile-box' key={this.state.id}>
          <div className='profile-box-left'>
          <img alt="profile" className="profile-pic" src={this.state.picture} style={{ width: '14rem', height: '14rem'}}/>         
              <div className='profile-sub-info'>
              <p><b>Age:</b> {this.state.age}</p> 
              <p><b>Country:</b> {this.state.country}</p>
              <p><b>Speaking:</b> {this.state.languagesSpoken.join(', ')}</p>
              <p><b>Learning:</b> {this.state.languagesLearn.join(', ')}</p>
              </div>
   
          </div>
          <div className='profile-detail'>
          <Card style={{ width: '100%', height: '100%'}}>
            <Card.Body>
              <Card.Title>
                <h3>
                  {this.state.username}
                </h3>
                <hr></hr>
                </Card.Title>
              <Card.Text>
                <p><b>Skills:</b> {this.state.skills.join(', ')}</p>
                  <p><b>Interests:</b> {this.state.interests.join(', ')}</p>
                  <p><b>Education: </b>{this.state.education} </p> 
                  <p><b>About: </b>{this.state.about}</p>  
                  <div>
                  <hr></hr>
                  <Link className='button' onClick={this.toggleEditForm}>Edit my profile</Link>           
                  </div>            
              </Card.Text>
            </Card.Body>
          </Card>
        
          </div>
        </div>
       
        )} 
        {this.state.editForm && (
              <EditProfile
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleFileUpload={this.handleFileUpload}
                handleLanguage={this.handleLanguage }
              />
              )}

        </>
        )
  }
}