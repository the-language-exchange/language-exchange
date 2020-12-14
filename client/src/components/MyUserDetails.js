import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import EditProfile from './EditProfile';
// import { Link } from 'react-router-dom'


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
    showDetails: true
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

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
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
      picture: this.state.picture,
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
  

  render() {
    if (!this.state.user) return <h3>Loading ...</h3>

    return ( 
         <>

        {this.state.showDetails && (
    
        <div key={this.state.user.id}>
          <h1> My User Details </h1>
            <h3>      
            {this.state.username}            
            </h3>
            <p>      
            Email: {this.state.email}           
            </p>
            <p>      
            Country: {this.state.country}     
            </p>
            <p>      
            Languages I speak: {this.state.languagesSpoken}          
            </p>
            <p>      
            Languages I want to learn: {this.state.languagesLearn}         
            </p>
            <p>      
            Education: {this.state.education}         
            </p>
            <p>
            Skills: {this.state.skills}
            </p>
            <p>
            Interests: {this.state.interests}
            </p>
            <img src={this.state.picture} alt="picture" style={{width: '200px'}}/>
            <p>
            About: {this.state.about}
            </p>
            <p>
            Age: {this.state.age}
            </p>              
            <div>
           <Button onClick={this.toggleEditForm}>Show Edit Form</Button>           
             </div> 
                
        </div>
       
        )} 
        {this.state.editForm && (
              <EditProfile
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
              )}

        </>
        )
  }
}