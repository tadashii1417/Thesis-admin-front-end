import {Button, Card, DatePicker, Form, Icon, Input, Select, TreeSelect} from "antd";
import React from "react";
import styles from './PublicCard.module.css';

const {Option} = Select;
const treeData = [
    {
        title: 'Development',
        description: "",
        slug: "development",
        count: 10,
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Web development',
                description: "",
                slug: "web-development",
                count: 10,
                value: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'Javascript',
                        description: "javascript",
                        slug: "javascript",
                        count: 10,
                        value: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: 'React JS',
                        description: "",
                        slug: "react-js",
                        count: 10,
                        value: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                ]
            },
            {
                title: 'Mobile Apps',
                description: "",
                slug: "mobile-apps",
                count: 10,
                value: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: 'Business',
        description: "",
        slug: "business",
        count: 10,
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Finance',
                description: "",
                slug: "finance",
                count: 10,
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Entrepreneurship',
                description: "entrepreneurship",
                slug: "",
                count: 10,
                value: '0-1-1',
                key: '0-1-1',
            }
        ]
    },
];
const tags = ['css', 'html', 'javascript', 'web', 'python', 'socket'];
const teachers = ['tadashii1417', 'hieu123', 'hao123'];

const tagOptions = tags.map((tag) => (
    <Option key={tag}>{tag}</Option>
));
const teacherOptions = teachers.map((teacher) => (
    <Option key={teacher}>{teacher}</Option>
));

export default function (props) {
    return (
        <Card title="General Settings" size="small" extra={<Icon type="setting"/>}
              actions={[
                  <Button type="ghost">Preview</Button>,
                  <Button type="primary">Save</Button>,
              ]}>
            <div>
                <div className={styles.cardBody}>
                    <Form>
                        <Form.Item label={<span className={styles.formHeading}><Icon type="eye" theme="twoTone"/>Visibility</span>}
                                   className={styles.formItem}>
                            <Select defaultValue="private">
                                <Option value="public">Public</Option>
                                <Option value="private">Private</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={<span className={styles.formHeading}><Icon type="build" theme="twoTone"/>Course Type</span>}
                            className={styles.formItem}>
                            <Select defaultValue="online">
                                <Option value="offline">Offline</Option>
                                <Option value="online">Online</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label={<span className={styles.formHeading}><Icon type="fire" theme="twoTone"/>Opening Day</span>}
                                   className={styles.formItem}>
                            <DatePicker/>
                        </Form.Item>

                        <Form.Item label={<span className={styles.formHeading}><Icon type="dollar" theme="twoTone"/>Price</span>}
                                   className={styles.formItem}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={<span className={styles.formHeading}><Icon type="folder-open" theme="twoTone"/>Course Category</span>}
                            className={styles.formItem}>
                            <TreeSelect treeData={treeData}/>
                        </Form.Item>
                        <Form.Item label={<span className={styles.formHeading}><Icon type="tag" theme="twoTone"/>Course Tags</span>}
                                   className={styles.formItem}>
                            <Select
                                mode="tags"
                                defaultValue={['html', 'css']}
                            >{tagOptions}</Select>
                        </Form.Item>
                        <Form.Item
                            label={<span className={styles.formHeading}><Icon type="smile" theme="twoTone"/>Course Teachers</span>}
                            className={styles.formItem}>
                            <Select
                                mode="tags"
                                defaultValue={['tadashii']}
                            >{teacherOptions}</Select>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </Card>
    )
        ;
}