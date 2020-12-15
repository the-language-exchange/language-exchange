import React, { Component } from 'react'
import {Button, Form } from 'react-bootstrap';
export default class Reply extends Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}
