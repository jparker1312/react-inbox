import React from 'react'
import {connect} from "react-redux"

const MessageBody = ({body = ""}) => {
  return (
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        {body}
      </div>
    </div>
  );
}

export default MessageBody
