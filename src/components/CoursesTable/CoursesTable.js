import React from "react";
import { Table, Tag, Badge, Avatar } from "antd";
import styles from './CoursesTable.module.css';
import { Typography, Button, Divider, Input } from "antd";
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;


const columns = [
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: src => <Avatar shape="square" size={64} src={src} />
    },
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
        render: text => <Badge count={text} />
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
        image: "https://sogo.edu.vn/wp-content/uploads/2019/08/javascript-la-gi.jpg",
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
        image: "http://dexlerone.com/wp-content/uploads/2019/08/technical-analysis-online-course.jpg",
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
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShV5Ff8R1eQho7SypNI2f-9WathvYZaniUJXwm9q_cwQEvPEyp&s",
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
        image: "https://techtalk.vn/wp-content/uploads/2016/06/techtalk-reactjs-696x392.png",
        title: "PHP and mySQL Basic",
        author: "tadashii",
        students: "10",
        tags: ["PHP", "MYSQL"],
        price: "200.000 đ",
        category: "Back-end",
        date: "20/10/2019"
    }
];
// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(
//             `selectedRowKeys: ${selectedRowKeys}`,
//             "selectedRows: ",
//             selectedRows
//         );
//     },
//     hideDefaultSelections: true
// };

export default function (props) {
    return (
        <div>
            <div className={styles.container}>
                <Title level={4}>Courses</Title>
                <Divider />
                <div className={styles.toolbar}>
                    <Link to="new-course">
                        <Button icon="plus" type="primary">
                            Add new
                        </Button>
                    </Link>
                    <Search
                        placeholder="Search Courses"
                        onSearch={value => console.log(value)}
                        className={styles.searchBox}
                        enterButton
                    />
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}
