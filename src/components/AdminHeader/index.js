import adminHeader from "./AdminHeader";
import {logoutUser} from "../../store/actions/auth_action";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser())
});

export default connect(null, mapDispatchToProps)(adminHeader);