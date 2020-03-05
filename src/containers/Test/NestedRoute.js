import React, {Component} from "react";
import {Route} from "react-router";
import {Link} from "react-router-dom";

class NestedRoute extends Component {
    render() {
        const {url} = this.props.match;
        return (
            <div>
                <div>Hello world</div>
                <div>
                    <Link to={url}>Home</Link>
                    <Link to={url + '/nest'}>Nest</Link>
                </div>

                <Route path={url} render={() => "home component"} exact/>
                <Route path={url + '/nest'} render={() => "nest component"} exact/>

            </div>


        );
    }
}

export default NestedRoute;