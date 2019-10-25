import React, { useEffect } from 'react'
import LogItem from './LogItem';
import { Preloader } from '../layout/Preloader';
import { connect } from 'react-redux'
import { getLogs } from '../../actions/logActions'
import PropTypes from 'prop-types'


const Logs = ({ log: { logs, loading }, getLogs }) => {  //destructuring state from log state and getting getLogs from props

    // const [logs, setLogs] = useState([]);
    // const [loading, setLoading] = useState(false);  //We are now using redux for app level state so no need of useState

    useEffect(() => {
        getLogs();
        //eslint-disable-next-line
    }, [])

    // We no longer need to call function from component as we are calling getLogs from action
    // const getLogs = async () => {
    //     setLoading(true);
    //     const res = await fetch('/logs');
    //     const data = await res.json();

    //     setLogs(data);
    //     setLoading(false);
    // }

    if (loading || logs === null) {
        return <Preloader />
    }
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {!loading && logs.length === 0 ?
                (<p className="center">No logs to show...</p>) :
                (logs.map(log => <LogItem logProp={log} key={log.id} />))
            }
        </ul >
    )
}


Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
}

const mapStatetoProps = (state) => ({
    log: state.log //LHS is any name, RHS is the variable name we defined in root reducer
    //we can also write as logs: state.log.logs and loading: state.log.loading
})
export default connect(mapStatetoProps, { getLogs })(Logs)