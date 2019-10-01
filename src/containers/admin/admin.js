import React, { Component } from "react";
import { Layout } from "antd";
import AdminSider from "../../components/AdminSider/AdminSider";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import Courses from "./Courses/Courses";


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
      <Layout style={{ height: "100vh" }}>
        <AdminSider collapsed={this.state.collapsed} />
        <Layout style={{ minHeight: "100vh" }}>
          <AdminHeader toggle={this.toggle} collapsed={this.state.collapsed} />
          <Courses />
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
