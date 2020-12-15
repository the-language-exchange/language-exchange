import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
export default class MessageList extends Component {
    state = {

    }
  
  clickHandler = () => {

  }
  
  render() {
    return (
      <div>
      <ListGroup className="text-left">
      {this.props.allMessages.map(message => {
        return (<div>
          <ListGroup.Item>
          <Link onClick = {() => this.props.getMessage(message._id)}>
          {message.client._id == message.sender._id ?
           message.receiver.username : message.sender.username}
          </Link>
          </ListGroup.Item>
        </div>)
      })}
      </ListGroup>
      </div>
    )
  }
}
