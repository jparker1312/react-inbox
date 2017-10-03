import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateSubjectText, updateBodyText, submitNewMessage} from '../actions'
import { Link } from 'react-router-dom'

const ComposeForm = ({changeSubjectText,
                      match,
                      changeBodyText,
                      addNewMessage,
                      composeForm = {composeFormOpen: false}}) => {
  const changeSubject = (e) => {
    e.preventDefault()
    changeSubjectText(e.target.value)
  }

  const changeBody = (e) => {
    e.preventDefault()
    changeBodyText(e.target.value)
  }

  const composeMessage = (e) => {
    var message = {
      subject: composeForm.subject,
      body: composeForm.body
    }
    addNewMessage(message)
  }

  return (
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input onChange={changeSubject} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea onChange={changeBody} name="body" id="body" className="form-control" defaultValue={""} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <Link to="/">
              <input onClick={composeMessage} defaultValue="Send" className="btn btn-primary" />
            </Link>
          </div>
        </div>
      </form>
  );
}

const mapStateToProps = state => ({
  composeForm: state.composeForm
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changeSubjectText: updateSubjectText,
  changeBodyText: updateBodyText,
  addNewMessage: submitNewMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeForm)
