import {connect} from 'react-redux';
import SecureRoute from "./SecureRoute";

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        isAuthenticated: state.authReducer.isAuthenticated
    }
};


export default connect(mapStateToProps)(SecureRoute);