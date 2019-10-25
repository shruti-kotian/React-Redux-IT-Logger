import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLogs } from '../../actions/logActions'
import TechSelectOptions from '../techs/TechSelectOptions'

export const EditLogModal = ({ current, updateLogs }) => {

    const [message, setMessage] = useState('')
    const [attention, setAttention] = useState(false)
    const [tech, setTech] = useState('')

    useEffect(() => {
        if (current) {
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.tech);
        }
    }, [current])

    const onSubmit = () => {
        if (message === '' || tech === '') {
            M.toast({ html: 'Please enter a message and tech' })
        } else {
            const updatedLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date()
            }

            updateLogs(updatedLog);

            M.toast({ html: `Log updated by ${tech}` })

            //Clear Fields
            setMessage('');
            setAttention(false);
            setTech('');
        }
    }
    return (
        <div id="edit-log-modal" className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4>Enter System Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
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

const modalStyle = {
    width: '75%',
    height: '75%'
}

EditLogModal.propTypes = {
    current: PropTypes.object,
    updateLogs: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    current: state.log.current
})

export default connect(mapStateToProps, { updateLogs })(EditLogModal)