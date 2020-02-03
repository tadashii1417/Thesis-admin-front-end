import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import Auth from './Auth';

const mapStateToProps = state => {
    return {
        error: state.authReducer.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (username, password) => dispatch(actions.loginUser(username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);