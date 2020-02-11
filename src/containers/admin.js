import React, {Component} from "react";
import {Layout} from "antd";
import AdminSider from "../components/AdminSider/AdminSider";
import AdminHeader from "../components/AdminHeader";


class Admin extends Component {
    state = {
        collapsed: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    updateDimensions = () => {
        if (window.innerWidth < (window.screen.availWidth * 2 / 3)) {
            this.setState({collapsed: true});
        } else {
            this.setState({collapsed: false});
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <Layout style={{height: "100vh"}}>
                <AdminSider collapsed={this.state.collapsed}/>
                <Layout style={{minHeight: "100vh"}}>
                    <AdminHeader toggle={this.toggle} collapsed={this.state.collapsed}/>
                    {this.props.children}
                </Layout>
            </Layout>
        );
    }
}

export default Admin;
