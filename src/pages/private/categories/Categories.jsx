import React, { useState } from "react";
import { Space, Table, Tag, Button, Typography  } from 'antd';
import { UpSquareOutlined, DownSquareOutlined, AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import AddCategory from "./addCategory/AddCategory";
import './Categories.css'

import FilterComponent from '../../../components/filterComponent'


const { Title } = Typography;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Types',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }, record) => (
      <>
        {tags.map((tag) => {
          let color = tag === 'expense' ? 'volcano' : 'green';
          let icon = tag === 'expense' ? <DownSquareOutlined /> : <UpSquareOutlined />;
          return (
            <div key={tag}>
              <Tag color={color} key={record.id}>
              {icon} {tag.toUpperCase()}
            </Tag>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    align: 'right',
    render: (_, record) =>{ 
       return (<div className="actionButtonsContainer">
                <Button className="outlinedGreenBtn" icon={<EditOutlined />} size={"small"}>
                    Edit
                </Button>
                <Button danger icon={<DeleteOutlined />} size={"small"}>
                    Delete
                </Button>
              </div>)
    },
  },
];

const data = [
  {
    key: '5',
    id: "0236d1e5-90f3-412d-84ad-057a1334a805",
    categoryId: "148884b0-a60e-4ec6-ba14-83b3944bdfb0",
    name: 'Concert',
    tags: ['expense'],
  },
  {
    key: '6',
    id: "851f66f3-9404-4657-bf8c-e5bcd296f823",
    categoryId: "fa791c9b-4ea1-449e-8f2e-caf6172a5321",
    name: 'Groceries',
    tags: ['expense'],
  },
  {
    key: '7',
    categoryId: "d445bf76-8ceb-4573-bf02-9fd67c9fba93",
    name: 'Programming',
    tags: ['income'],
  },
  {
    key: '8',
    id: "696f7890-f370-4517-b645-0a77312f6bad",
    categoryId: "d445bf76-8ceb-4573-bf02-9fd67c9fba93",
    name: 'Electronics store',
    tags: ['income'],
  },
];

function Categories() {
  const [filterByType, setFilterByType] = useState("all");


  let filteredData = data.filter( item => {
    if (filterByType === 'all') {
      return true
    }
    return item.tags[0] === filterByType
  })


  return (
    <div>
      <div className="categoryHeader">
        <div>
            <AddCategory />
        </div>
        <div>
           <FilterComponent filterByType={filterByType} setFilterByType={setFilterByType}/>
        </div>
      </div>
      <div className="categoriesTableContainer">
        <div className="categoriesTable">
            <Table title={() => <Title level={3}>Categories</Title>} columns={columns} dataSource={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default Categories;