import React from 'react'
import Message from '../components/Message'

export default class MessageList extends React.Component {
  messageSelected = (message) => {
    this.props.messageSelected(message)
  }

  render(){
    return(
      <div>
        {this.props.messages.map(
          message => <Message key={message.id} message={message} messageSelected={this.messageSelected}/>)}
      </div>
    );
  }
}
