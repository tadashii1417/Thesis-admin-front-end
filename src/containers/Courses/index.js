import Courses from "./Courses";
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

export default connect(mapStateToProps)(Courses);
