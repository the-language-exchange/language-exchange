import React, { Component } from 'react';
// import MessageForm from './MessageForm';
import axios from 'axios';
import {Card , Button, Form, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import axios from 'axios';


export default class Messages extends Component {
  state = {
    content : '',
    sender : '',
    receiver : '',
    date: Date,
    showMessage: false
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

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    console.log(this.state);
    axios.post('/api/messages', {
      content: this.state.content
    })
      .then(() => {
        // set the form to it's initial state (empty input fields)
        this.setState({
          content:''
        })
        // update the parent components state (in Projects) by calling getData()
        this.props.getData();
      })
      .catch(err => console.log(err))

  }

  toggleMessage = () => {
    this.setState((prevState) => ({
      showMessage: !prevState.showMessage
    }))
  }

  render() {

    return (
    <div className='messagesInbox'>
      <ListGroup className="text-left">
      <ListGroup.Item>
      <Link onClick={this.toggleMessage}>Username A</Link>
      </ListGroup.Item>
      <ListGroup.Item>
      <Link onClick={this.toggleMessage}>Username B</Link>
      </ListGroup.Item>
      <ListGroup.Item>
      <Link onClick={this.toggleMessage}>Username C </Link>
      </ListGroup.Item>
      </ListGroup>

      <div className='messagesCenter'>
        <Card className="text-center">
          <Card.Header>Message from Username A</Card.Header>
            <Card.Body>
            <Card.Text>
            <div class="talk-bubble-left tri-right round left-in">
            <div class="talktext-left">     
            With supporting text below as a natural lead-in to additional content.
            <p style={{fontSize: '10px'}}>Wrote by Sender</p>
            </div>
            </div>
            </Card.Text> 
            <Card.Text >
            <div class="talk-bubble-right tri-right round right-in">
            <div class="talktext-right">
            With supporting text below as a natural lead-in to additional content.
            <p style={{fontSize: '10px'}}>Wrote by Receiver</p>
              </div>
              </div>
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
                <Button type='submit'>Send</Button>
               </Form>
               </Card.Body>
               <Card.Footer className="text-muted">2 days ago{this.state.date}</Card.Footer>
          
        </Card>
      </div>
    </div>      
    )
  }
}

