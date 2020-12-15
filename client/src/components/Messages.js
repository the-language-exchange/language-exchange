import React, { Component } from 'react';
// import MessageForm from './MessageForm';
import axios from 'axios';
import {Card , Button, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import axios from 'axios';

export default class Messages extends Component {
  state = {
    content : [],
    sender : '',
    receiver : ''
  }


  getData = () => {
    axios.get('/api/messages')
      .then(response => {
        console.log(response);
        // put them into the state
        this.setState({
          messages: response.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    return (
    <div className='messagesInbox'>
      <Card className="text-left">
      <Card.Header>
      <Link>Sender A {this.state.sender}</Link>
      </Card.Header>
      <Card.Header>
      <Link>Sender B {this.state.sender}</Link>
      </Card.Header>
      <Card.Header>
      <Link>Sender C {this.state.sender}</Link>
      </Card.Header>
      </Card>

      <div className='messagesCenter'>

        <Card className="text-center">
          <Card.Header>Message from Sender A {this.state.sender}</Card.Header>
            <Card.Body>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
          
        <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor='content'> </Form.Label>
                  <Form.Control
                    type='text'
                    name='content'
                    placeholder='Write a message'
                    as="textarea" 
                    rows={3} 
                    id='content'
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button type='submit'>Reply</Button>
               </Form>
               </Card.Body>
               <Card.Footer className="text-muted">2 days ago</Card.Footer>
          
        </Card>
      </div>
    </div>      
    )
  }
}

