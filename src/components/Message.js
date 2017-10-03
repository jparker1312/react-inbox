import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {changeStarredStatus, toggleMessageSelected, retrieveMessageBody, markAsRead} from '../actions'
import { Link, Route } from 'react-router-dom'
import MessageBody from '../components/MessageBody.js'

const Message = ({match, history, message, starClicked, messageSelected, messages, subjectClicked, markSingleAsRead}) => {

  const starWasClicked = (e) => {
    e.preventDefault()
    starClicked(message)
  }

  const checkboxClicked = (e) => {
    messageSelected(message, messages)
  }

  const subjectWasClicked = (e) => {
    subjectClicked(message)
  }

  const markSingleMessageAsRead = (e) => {
    var newMessages = messages.all
    for(var m of newMessages){
      if(m.id === message.id)
        m.read = true
    }
    // markSingleAsRead(newMessages)

  }

  var containerClassName = "row message unread"
  var selected = ""
  var starClassName = "star fa fa-star-o"

  if(message.selected){
      containerClassName += " selected"
      selected = "checked"
  }

  if(message.read)
      containerClassName = "row message read"

  if(message.starred)
      starClassName = "star fa fa-star"


  var subjectTo = `/`
  if(history.location.pathname === "/" || history.location.pathname !== "/messages/" + message.id.toString()){
    subjectTo = "/messages/" + message.id.toString()
  }
  else if (message.body === undefined && history.location.pathname === "/messages/" + message.id.toString()) {
    subjectWasClicked()
  }

  var d = "/messages/" + message.id.toString()


  return (
    <div className={containerClassName}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onChange={checkboxClicked} type="checkbox" checked={selected}/>
          </div>
          <div className="col-xs-2">
            <i onClick={starWasClicked} className={starClassName}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map((label,i) => <span key={i} className="label label-warning">{label}</span>)}
        <Link onClick={subjectWasClicked} to={subjectTo}>
          {message.subject}
        </Link>
        <Route exact path={d} component={props => <MessageBody body={message.body} {...props} />}/>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  messages: state.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  starClicked: changeStarredStatus,
  messageSelected: toggleMessageSelected,
  subjectClicked: retrieveMessageBody,
  markSingleAsRead: markAsRead
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
