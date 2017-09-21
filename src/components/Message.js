import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {changeStarredStatus, toggleMessageSelected} from '../actions'

const Message = ({message, starClicked, messageSelected, messages}) => {

  const starWasClicked = (e) => {
    e.preventDefault()
    starClicked(message)
  }

  const checkboxClicked = (e) => {
    messageSelected(message, messages)
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
        <a href="#">
          {message.subject}
        </a>
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
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
