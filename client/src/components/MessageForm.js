import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


export default class MessageForm extends Component {
  state = {
    content: ''
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
    axios.post('/api/projects', {
      title: this.state.title,
      description: this.state.description
    })
      .then(() => {
        // set the form to it's initial state (empty input fields)
        this.setState({
          title: '',
          description: ''
        })
        // update the parent components state (in Projects) by calling getData()
        this.props.getData();
      })
      .catch(err => console.log(err))

  }

  render() {
   return (
      <>
      <div  className='messageBox'>

      <h4>Send a Message </h4>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor='content'>Message: </Form.Label>
                  <Form.Control
                    type='text'
                    name='content'
                    id='content'
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
