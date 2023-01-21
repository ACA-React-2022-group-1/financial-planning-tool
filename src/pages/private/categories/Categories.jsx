import React, { useState, useContext } from "react";
import { Space, Table, Tag, Button, Typography  } from 'antd';
import { UpSquareOutlined, DownSquareOutlined, AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import AddCategory from "./addCategory/AddCategory";
import {DataContext} from '../../private/homeLayout/HomeLayout'
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
    key: 'type',
    dataIndex: 'type',
    render: (type) => {
      let color = type === 'expense' ? 'volcano' : 'green';
      let icon = type === 'expense' ? <DownSquareOutlined /> : <UpSquareOutlined />;
        {
          return (
            <div>
              <Tag color={color}>
                {icon} {type.toUpperCase()}
              </Tag>
            </div>
          );
        }
      }
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



function Categories() {
  const {categories, addCategory} = React.useContext(DataContext)
  const [filterByType, setFilterByType] = useState("all");


  let filteredData = categories.filter( item => {
    if (filterByType === 'all') {
      return true
    }
    return item.type === filterByType
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
            <Table 
            title={() => <Title level={3}>Categories</Title>} 
            columns={columns} 
            dataSource={filteredData}
            pagination={{ defaultPageSize: 7, showSizeChanger: true, pageSizeOptions: ['7', '14', '21']}}
             />
        </div>
      </div>
    </div>
  );
}

export default Categories;