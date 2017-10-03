import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toggleCompForm, bulkMessageClicked, deleteMessage, markAsRead, markAsUnread, addLabel, removeLabel} from '../actions'
import { Link } from 'react-router-dom'

const Toolbar = ({match,
                  history,
                  toggleComposeForm,
                  composeForm = {composeFormOpen: false},
                  bulkMessageSelected,
                  messages = {toolbar: {bulkMessageClassName: "fa fa-square-o"}},
                  deleteThisMessage,
                  markThisAsRead,
                  markThisAsUnread,
                  addThisLabel,
                  removeThisLabel
                  }) => {
  const toggComposeForm = (e) => {
    toggleComposeForm()
  }

  const bulkSelect = (e) => {
    bulkMessageSelected(messages.toolbar.bulkMessageClassName)
  }

  const markAsRead = (e) => {
    markThisAsRead(messages.all)
  }
  const markAsUnread = (e) => {
    markThisAsUnread(messages.all)
  }
  const addLabel = (e) => {
    addThisLabel(messages.all, e.target.value)
  }
  const removeLabel = (e) => {
    removeThisLabel(messages.all, e.target.value)
  }
  const deleteMessage = (e) => {
    deleteThisMessage(messages.all)
  }

  var unreadMessageText = "unread messages"
  var disabled = ""
  var composeFormClassText = "fa fa-plus"
  var numMessagesSelected = ""

  if(messages.toolbar.unreadMessageCount === 1)
    unreadMessageText = "unread message"

  var messagesSelected = 0
  for(var m of messages.all){
    if(m.selected){
      messagesSelected++
      break
    }
  }

  if(messagesSelected === 0)
    disabled = "disabled"

  var composeMessageTo = `/compose`
  if(history.location.pathname === "/compose"){
    composeMessageTo = `/`
    composeFormClassText = "fa fa-minus"
  }


  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{messages.toolbar.unreadMessageCount}</span>
          {unreadMessageText}
        </p>

        <Link className="btn btn-danger" to={composeMessageTo}>
          <i onClick={toggComposeForm} className={composeFormClassText}></i>
        </Link>

        <button className="btn btn-default">
          <i onClick={bulkSelect} className={messages.toolbar.bulkMessageClassName}></i>
        </button>

        <button onClick={markAsRead} className="btn btn-default" disabled={disabled}>
          Mark As Read
        </button>

        <button onClick={markAsUnread} className="btn btn-default" disabled={disabled}>
          Mark As Unread
        </button>

        <select onChange={addLabel} className="form-control label-select" disabled={disabled}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select onChange={removeLabel} className="form-control label-select" disabled={disabled}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={disabled}>
          <i onClick={deleteMessage} className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  messages: state.messages,
  composeForm: state.composeForm
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleComposeForm: toggleCompForm,
  bulkMessageSelected: bulkMessageClicked,
  deleteThisMessage: deleteMessage,
  markThisAsRead: markAsRead,
  markThisAsUnread: markAsUnread,
  addThisLabel: addLabel,
  removeThisLabel: removeLabel
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
