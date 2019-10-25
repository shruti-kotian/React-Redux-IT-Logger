import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteLogs, setCurrent } from '../../actions/logActions'
import M from 'materialize-css/dist/js/materialize.min.js'

const LogItem = ({ logProp, deleteLogs, setCurrent }) => {

    const onDelete = () => {
        deleteLogs(logProp.id)
        M.toast({ html: 'Log deleted' })
    }
    return (
        <li className="collection-item">
            <div>
                <a
                    href='#edit-log-modal'
                    className={`modal-trigger ${logProp.attention ? 'red-text' : 'blue-text'}`}
                    onClick={() => setCurrent(logProp)}>
                    {logProp.message}
                </a>
                <br />
                <span className="grey-text">
                    <span className="black-text">ID #{logProp.id} last updated by {' '}</span>
                    <span className="black-text">{logProp.tech}</span> on {' '}
                    <Moment format='MMMM Do YYYY, h:mm:ss a'>{logProp.date}</Moment>
                </span>
                <a href="#!" className="secondary-content">
                    <i className="material-icons grey-text" onClick={onDelete}>delete</i>
                </a>
            </div>
        </li>
    )
}

LogItem.propTypes = {
    logProp: PropTypes.object.isRequired,
    deleteLogs: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired
}

export default connect(null, { deleteLogs, setCurrent })(LogItem)