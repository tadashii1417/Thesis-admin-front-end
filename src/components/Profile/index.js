import UserProfile from "./Profile";
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});


export default connect(mapStateToProps, null)(UserProfile);