import React, { useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import { connect } from 'react-redux'
import { addLogs } from '../../actions/logActions'
import PropTypes from 'prop-types'
import TechSelectOptions from '../techs/TechSelectOptions'

const AddLogModal = ({ addLogs }) => {

    const [message, setMessage] = useState('')
    const [attention, setAttention] = useState(false)
    const [tech, setTech] = useState('')

    const onSubmit = () => {
        if (message === '' || tech === '') {
            M.toast({ html: 'Please enter a message and tech' })
        } else {
            const newLog = {
                message,
                attention,
                tech,
                date: new Date()
            }
            addLogs(newLog)

            M.toast({ html: `Log added by ${tech}` })
            //Clear Fields
            setMessage('');
            setAttention(false);
            setTech('');
        }
    }
    return (
        <div id="add-log-modal" className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4>Enter System Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
                        <label htmlFor="message" className="active" >Log Message</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <select name="tech" value={tech} className="browser-default " onChange={e => setTech(e.target.value)}>
                            <option value="" disabled>Select Technicians</option>
                            <TechSelectOptions />
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={e => setAttention(!attention)} />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect blue waves-light btn-flat" onClick={onSubmit}>Enter</a>
            </div>
        </div>
    )
}

AddLogModal.propTypes = {
    addLogs: PropTypes.func.isRequired
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

export default connect(null, { addLogs })(AddLogModal)