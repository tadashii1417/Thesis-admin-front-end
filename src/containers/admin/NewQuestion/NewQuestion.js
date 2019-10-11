import React, {Component} from "react";
import {Card, Input, InputNumber, Form, Button, Icon, Select, Divider, Table} from 'antd';
import styles from './NewQuestion.module.css';

const {TextArea} = Input;
const {Option} = Select;

const dummyQuestion = {
    columns: [
        {
            title: 'Answers',
            dataIndex: 'answer',
            width: '80%'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (<div>
                    <Icon type="edit" theme="twoTone"/>
                    <Divider type="vertical"/>
                    <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96"/>
                </div>);
            }
        }
    ],
    answers: [
        {
            key: '1',
            answer: 'Opponitur ais dubitet multa erigimur motum paradoca nocent rogavit filio ponere naturam confusioque opifices'
        },
        {
            key: '2',
            answer: 'Sentiret multitudinis volunt inchoavit velut par poenam leges vocant radicitus dare'
        },
        {
            key: '3',
            answer: 'Adulter pythagoras mori peccetur facilis dubitamus amantissimus agendum vitae extiterunt tanto perpetua praeponatur'
        },
        {
            key: '4',
            answer: 'Epicureum lapathi qualem libidini consolando lapathi incidunt q interrete tardeve natae am'
        },

    ]
}
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
    }
};

export default class extends Component {
    render() {
        return (
            <div className={styles.content}>
                <div className={styles.contentLeft}>
                    <Card title="Add / Edit question !">
                        <Form layout="vertical">
                            <Form.Item label="Question Title" style={{padding: 0, marginBottom: "10px"}} required>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Description" style={{padding: 0, marginBottom: "10px"}}>
                                <TextArea style={{height: "100px"}}/>
                            </Form.Item>
                            <Form.Item label="Question Explanation" style={{padding: 0, marginBottom: "10px"}}>
                                <TextArea style={{height: "70px"}}/>
                            </Form.Item>
                            <Form.Item label="Question Hint" style={{padding: 0, marginBottom: "10px"}}>
                                <TextArea style={{height: "50px"}}/>
                            </Form.Item>
                        </Form>
                    </Card>
                    <Card title="Question answer" size="small" extra={<Select defaultValue={"single"}>
                        <Option value="single">Single Choice</Option>
                        <Option value="mulitple">Multiple Choice</Option>
                        <Option value="truefalse">True or false</Option>
                    </Select>}>
                        <Table columns={dummyQuestion.columns} dataSource={dummyQuestion.answers} rowSelection={rowSelection}/>
                    </Card>
                </div>
                <div className={styles.contentRight}>
                    <Card title="General Settings" size="small" extra={<Icon type="setting"/>}
                          actions={[
                              <Button type="ghost">Cancel</Button>,
                              <Button type="primary">Save</Button>,
                          ]}>
                        <div>
                            <div className={styles.cardBody}>
                                <Form>
                                    <Form.Item
                                        label={<span className={styles.formHeading}><Icon type="eye" theme="twoTone"/>Visibility</span>}
                                        className={styles.formItem}>
                                        <Select defaultValue="private">
                                            <Option value="public">Public</Option>
                                            <Option value="private">Private</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label={<span className={styles.formHeading}><Icon type="check-circle"
                                                                                                 theme="twoTone"/>Question mark</span>}
                                               className={styles.formItem}>
                                        <InputNumber defaultValue={1}/>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>);
    }
}
