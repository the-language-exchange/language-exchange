import React, { Component } from 'react'
import axios from 'axios';
// import { Button } from '@material-ui/core';
import { Card, Button} from 'react-bootstrap'
import MessageForm from './MessageForm'


export default class ProfileDetails extends Component {
  state = {
    id: '',
    username: '',
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
  
  getData = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/users/${id}`)
    .then(response => {
      this.setState({ 
        user: response.data,
        username: response.data.username,
        email: response.data.email,
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
    console.log(response.data)
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    return (
      <>
          <div className='profile-box' key={this.state.id}>
          <img alt="profile" className="profile-pic" src={this.state.picture} style={{ width: '150px', height: '150px'}}/>
          <div className='profile-detail'>
          <Card style={{ width: '400px' }}>
            <Card.Body>
              <Card.Title>
                <h3>
                  {this.state.username}
                </h3>
                </Card.Title>
              <Card.Text>
                <p> <b>Skills:</b> {this.state.skills.join(', ')}</p>
                <p><b>Interests:</b> {this.state.interests.join(', ')}</p>
                <p><b>Age: </b>{this.state.age}</p>
                <p><b>Country: </b>{this.state.country}</p>
                <p><b>Languages I speak: </b>{this.state.languagesSpoken.join(', ')}</p>
                <p><b>Languages I would like to learn: </b>{this.state.languagesLearn.join(', ')}</p>
                <p><b>Education: </b>{this.state.education} </p> 
                <p><b>About: </b>{this.state.about}</p>
                
              </Card.Text>
            </Card.Body>
            <MessageForm />

          </Card>
          </div>
   
      {/* </div>
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
            <img src={this.state.picture} alt="profile" style={{width: '200px'}}/>
            <p>
            About: {this.state.about}
            </p>
            <p>
            Age: {this.state.age}
            </p> 

        </div> */}

        </div>


        <MessageForm receiverID = {this.props.match.params.id}/>
      


        </>
        )
  }
}