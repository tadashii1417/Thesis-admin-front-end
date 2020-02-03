import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import Auth from './Auth';

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);