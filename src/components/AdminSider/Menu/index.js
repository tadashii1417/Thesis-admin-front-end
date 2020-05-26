import {connect} from 'react-redux';
import Menu from "./Menu";

const mapStateToProps = state => {
    return {user: state.authReducer.user}
};

export default connect(mapStateToProps)(Menu);