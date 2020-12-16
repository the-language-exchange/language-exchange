import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import SideBar from './SideBar/SideBar';
import { Card, Spinner} from 'react-bootstrap';
import exchangeWhite from './Assets/exchangeWhite.png';


export default class ProfileList extends Component {
  state = {
    users: []
  }

  getData = () => {
    axios.get('api/users')
    .then(response => {
      this.setState({ 
        users: response.data
      })
    })
    .catch(err => console.log(err))
  }

  updateData = (data) => {
    this.setState({users:data})
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (!this.state.users) 
    return 

    <div className='spinner'>
    <Spinner animation="border" role="status" >
    <span className="sr-only">Loading...</span>
    </Spinner>
    </div>

    return (
      <>
      <div>
      <SideBar updateData = {this.updateData} />
      <div className='welcome-left'>
      <img  style={{ width: '10rem', backgroundColor: '#5465ff' }} alt='exchangeWhite' src={exchangeWhite}/>
      <div className='welcome'>
      <h2 className='h2'> Welcome to The Language Exchange App</h2>
      <p className='welcome-text'>Find language tandems from all over the world. Exchange your skills and share your interests.</p>
      <hr></hr>
      </div>
      </div>
      <div className='users-container'>
      {this.state.users.map(user => {
        return(
        <div className='profile-list' key={user._id}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.picture} style={{ height: '18rem' }}/>
            <Card.Body>
              <Card.Title>
                <h3>
                  <Link to={`/${user._id}`} className='card-title'>
                  {user.username}
                  </Link>
                </h3>
                <hr></hr>
                </Card.Title>
              <Card.Text>
                <p><b>Skills:</b> {user.skills.splice(0,2).join(', ')}</p>
                <p><b>Interests:</b> {user.interests.join(', ')}</p>
                <p><b>Age: </b>{user.age}</p>
                <p><b>Country: </b>{user.country}</p>
                <p><b>Languages spoken: </b>{user.languagesSpoken.join(', ')}</p>
                <p><b>Languages learn: </b>{user.languagesLearn.join(', ')}</p>
              </Card.Text>
              <hr></hr>
              <Link to={`/${user._id}`} className='button' style={{ color: '#5465ff' }} variant="primary">Find out more</Link>
            </Card.Body>
          </Card>
        </div>
        )
      })}
      </div>
      </div>
    </>
    )
  }
}