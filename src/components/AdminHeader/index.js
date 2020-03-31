import adminHeader from "./AdminHeader";
import {logoutUser} from "../../store/actions/auth_action";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isAppLoading: state.uiReducer.isAppLoading
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(adminHeader);