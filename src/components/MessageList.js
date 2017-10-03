import React from 'react'
import Message from '../components/Message'

const MessageList = ({match, history, messages}) => {
  return (
    <div>
      {messages.map(
        message => <Message key={message.id} message={message} history={history}/>)}
    </div>
  );
}

export default MessageList
