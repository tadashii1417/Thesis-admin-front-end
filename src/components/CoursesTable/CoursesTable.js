import React from "react";
import {Table, Tag, Badge} from "antd";
import styles from './CoursesTable.module.css';
import {Typography, Button, Divider, Input} from "antd";

const {Title} = Typography;
const {Search} = Input;


const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: text => <a href="/">{text}</a>
    },
    {
        title: "Author",
        dataIndex: "author",
        key: "author"
    },
    {
        title: "Price",
        key: "price",
        dataIndex: "price"
    },
    {
        title: "Category",
        key: "category",
        dataIndex: "category"
    },
    {
        title: "Date",
        key: "date",
        dataIndex: "date"
    },
    {
        title: "Students",
        dataIndex: "students",
        key: "student",
        render: text => <Badge count={text}/>
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
            <span>
        {tags.map(tag => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
                color = "volcano";
            }
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
        )
    }
];
const data = [
    {
        key: "1",
        title: "Learn HTML, CSS from Scratch",
        author: "tadashii",
        students: "15",
        tags: ["HTML", "CSS", "WEB"],
        price: "600.000 đ",
        category: "Web",
        date: "20/10/2019"
    },
    {
        key: "2",
        title: "Javascript Basic",
        author: "tadashii",
        students: "20",
        tags: ["JAVASCRIPT"],
        price: "200.000 đ",
        category: "Front-end",
        date: "20/10/2019"
    },
    {
        key: "3",
        title: "Javascript Advanced",
        author: "tadashii",
        students: "20",
        tags: ["JAVASCRIPT"],
        price: "200.000 đ",
        category: "Web",
        date: "20/10/2019"
    },
    {
        key: "4",
        title: "PHP and mySQL Basic",
        author: "tadashii",
        students: "10",
        tags: ["PHP", "MYSQL"],
        price: "200.000 đ",
        category: "Back-end",
        date: "20/10/2019"
    }
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
    }
};

export default function (props) {
    return (
        <div>
            <div className={styles.container}>
                <Title level={4}>Courses</Title>
                <Divider/>
                <div className={styles.toolbar}>
                    <Button icon="plus" type="primary">
                        Add new
                    </Button>
                    <Search
                        placeholder="Search Courses"
                        onSearch={value => console.log(value)}
                        className={styles.searchBox}
                        enterButton
                    />
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
            </div>
        </div>
    );
}
