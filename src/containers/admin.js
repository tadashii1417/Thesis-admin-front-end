import React, {Component} from "react";
import {Layout} from "antd";
import './admin.css';
import AdminSider from "../components/AdminSider/AdminSider";
import AdminHeader from "../components/AdminHeader/AdminHeader";


class Admin extends Component {
    state = {
        collapsed: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

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
