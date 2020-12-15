import React, { Component } from 'react'
import {Card } from 'react-bootstrap';
import Reply from './Reply'
export default class MessageCard extends Component {
  render() {
    return (
      <div className='messagesCenter'>
        <Card className="text-center">
          <Card.Header>Message from Username A</Card.Header>
            <Card.Body>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            <p style={{fontSize: '10px'}}>Wrote by Sender</p>
            </Card.Text>  
               <Reply />   
               </Card.Body>
               <Card.Footer className="text-muted">2 days ago{this.state.date}</Card.Footer>
               </Card>
      </div>
    )
  }
}
