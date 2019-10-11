import React from "react";
import {List, Avatar, Rate} from 'antd';
const data = [
    {
        userName: 'John',
        star: 3.5,
        comment: 'Very attractive !'
    },
    {
        userName: 'Frank Lampard',
        star: 3,
        comment: 'Max explains all important things very well. It is easy to understand for beginners and also good for those who want to refresh their current knowledge. He is really one of the greatest tutors.'
    },
    {
        userName: 'Jack Ma',
        star: 4.5,
        comment: 'Good !'
    },
    {
        userName: 'Duong Van Truong',
        star: 1.5,
        comment: 'Not good !'
    },
];

export default function (props) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                        title={<a href="https://ant.design">{item.userName}</a>}
                        description={<div>
                            <Rate allowHalf defaultValue={item.star} />
                            <div>{item.comment}</div>
                        </div>}
                    />
                </List.Item>
            )}
        />
    );
}