import React, {Component} from "react";
import Loading from "../Loading/Loading";
import {Button, Card, Col, Divider, message, Row} from "antd";
import {getPermissions} from "../../services/role_service";

const {Meta} = Card;

class PermissionList extends Component {
    state = {
        permissions: [],
        loading: true,
        activePermission: null
    }

    setActivePermission = (id) => {
        this.setState({activePermission: id});
    }

    async componentDidMount() {
        try {
            const {data} = await getPermissions();
            this.setState({loading: false, permissions: data});
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    render() {
        const {loading, permissions} = this.state;
        const {handleAddPermission, onCancel} = this.props;

        const activeClass = {
            backgroundColor: '#1890ff',
            color: 'white',
            cursor: 'pointer',
            marginTop: 16,
            transition: '0.5s'
        }

        const defaultStyle = {
            cursor: 'pointer',
            marginTop: 16,
            transition: '0.5s'
        }

        if (loading) return <Loading/>;

        return (
            <>
                <Row gutter={8}>
                    {permissions.map(permission => {
                        const activeId = this.state.activePermission ? this.state.activePermission.id : null;

                        return (
                            <Col sm={24} md={12} lg={8} key={permission.id}>
                                <Card onClick={() => this.setActivePermission(permission)}
                                      style={permission.id === activeId ? activeClass : defaultStyle}>
                                    <Meta
                                        title={permission.name}
                                        description={permission.description}
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
                <div style={{textAlign: 'right'}}>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Divider type="vertical"/>
                    <Button type="primary" icon='plus'
                            onClick={() => handleAddPermission(this.state.activePermission)}>Add</Button>
                </div>
            </>
        )
    }
}

export default PermissionList;
