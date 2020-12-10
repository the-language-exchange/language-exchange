import React, { Component } from 'react'
import axios from 'axios';

export default class MyUserDetails extends Component {
  state = {
    user: null,
    username: '',
    email: '',
     // country: '',
    // languagesSpoken: [],
    // languagesLearn: [],
    // education: [],
    // skills: [],
    // interests: [],
    // picture: '',
    // about: '',
    // age: 0
  }

  getData = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/users/${id}`)
    .then(response => {
      this.setState({ 
        user: response.data,
        username: response.data.username,
        email: response.data.email,
        // country: response.data.country,
        // languagesSpoken: response.data.languagesSpoken,
        // languagesLearn: response.data.languagesLearn,
        // education: response.data.education,
        // skills: response.data.skills,
        // interests: response.data.interests,
        // picture: response.data.picture,
        // about: response.data.about,
        // age: response.data.age,
      })
    console.log(response.data)
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (!this.state.user) return <h3>Loading ...</h3>

    return (
    
        <div key={this.state.user.id}>
          <h1> My Profile Details</h1>
             <h3>      
              {this.state.username}            
            </h3>
            <h2>      
              {this.state.email}            
            </h2>
    
        </div>
        )
  }
}