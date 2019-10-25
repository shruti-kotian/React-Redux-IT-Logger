import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTech } from '../../actions/techActions'
import M from 'materialize-css/dist/js/materialize.min.js'

const TechItem = ({ techProp, deleteTech }) => {

    const onDelete = () => {
        deleteTech(techProp.id);
        M.toast({ html: 'Technician deleted' });
    }
    return (
        <li className="collection-item">
            <div>
                {techProp.firstName} {techProp.lastName}
                <a href="#!" className="secondary-content" onClick={onDelete}>
                    <i className="material-icons grey-text"> delete </i>
                </a>
            </div>
        </li>
    )
}

TechItem.propTypes = {
    techProp: PropTypes.object.isRequired,
    deleteTech: PropTypes.func.isRequired,
}

export default connect(null, { deleteTech })(TechItem)