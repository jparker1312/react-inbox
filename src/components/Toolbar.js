import React from 'react'

export default class Toolbar extends React.Component {
  render(){
    var unreadMessageText = "unread messages"
    var disabled = ""

    if(this.props.unreadMessageCount === 1)
      unreadMessageText = "unread message"

    if(this.props.bulkMessageSelected === "fa fa-square-o")
      disabled = "disabled"

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadMessageCount}</span>
            {unreadMessageText}
          </p>

          <a className="btn btn-danger">
            <i onClick={this.props.toggleComposeForm} className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default">
            <i onClick={this.props.bulkSelect} className={this.props.bulkMessageSelected}></i>
          </button>

          <button onClick={this.props.markAsRead} className="btn btn-default" disabled={disabled}>
            Mark As Read
          </button>

          <button onClick={this.props.markAsUnread} className="btn btn-default" disabled={disabled}>
            Mark As Unread
          </button>

          <select onChange={this.props.addLabel} className="form-control label-select" disabled={disabled}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select onChange={this.props.removeLabel} className="form-control label-select" disabled={disabled}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={disabled}>
            <i onClick={this.props.deleteMessage} className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}
