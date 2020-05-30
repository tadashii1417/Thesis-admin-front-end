import UserProfile from "./Profile";
import {connect} from 'react-redux';
import {getMe} from "../../store/actions";

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    getMe: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);