import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';



export default class MessageForm extends Component {
  state = {
    sender: '',
    content: '', 
    receiver : ''
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
    axios.post('/api/messages/send/'+this.props.receiverID, {
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

  render() {
   return (
      <>
      <div  className='messageFormProfile'>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor='content'>Send a Message: </Form.Label>
                  <Form.Control
                    type='text'
                    name='content'
                    id= {this.props.id}
                    placeholder='Write a message'
                    as="textarea" 
                    rows={3}
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button type='submit'>Send</Button>
                </Form>
      </div>
      </>
    )
  }
}
