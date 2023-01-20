import React, { useState } from "react";
import { Space, Table, Tag, Button, Typography  } from 'antd';
import { UpSquareOutlined, DownSquareOutlined } from '@ant-design/icons';
import "./Summary.css";

import FilterComponent from '../../../components/filterComponent'


const { Title } = Typography;
const columns = [
  {
    title: 'Category',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag === 'expense' ? 'volcano' : 'green';
          let icon = tag === 'expense' ? <DownSquareOutlined /> : <UpSquareOutlined />;
          return (
            <div key={tag}>
              <Tag color={color} key={tag}>
               {icon} {tag.toUpperCase()}
             </Tag>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: 'Amount',
    className: 'column-amount',
    key: 'amount',
    dataIndex: 'amount',
    align: 'right',
    sorter: (a, b) => a.amount - b.amount,
    render: (_, record) =>{ 
       return <span>{record.tags[0] === 'expense' ? `-${record.amount}` : `+${record.amount}`}</span>
    },
  },
];

const data = [
  {
    key: '1',
    id: "0236d1e5-90f3-412d-84ad-057a1334a805",
    categoryId: "148884b0-a60e-4ec6-ba14-83b3944bdfb0",
    name: 'Concert',
    amount: 310,
    tags: ['expense'],
  },
  {
    key: '2',
    id: "851f66f3-9404-4657-bf8c-e5bcd296f823",
    categoryId: "fa791c9b-4ea1-449e-8f2e-caf6172a5321",
    name: 'Groceries',
    amount: 120,
    tags: ['expense'],
  },
  {
    key: '3',
    categoryId: "d445bf76-8ceb-4573-bf02-9fd67c9fba93",
    name: 'Programming',
    amount: 1000,
    tags: ['income'],
  },
  {
    key: '4',
    id: "696f7890-f370-4517-b645-0a77312f6bad",
    categoryId: "d445bf76-8ceb-4573-bf02-9fd67c9fba93",
    name: 'Electronics store',
    amount: 850,
    tags: ['income'],
  },
];

function Summary() {
  const [filterByType, setFilterByType] = useState("all");


  let filteredData = data.filter( item => {
    if (filterByType === 'all') {
      return true
    }
    return item.tags[0] === filterByType
  })


  return (
    <div>
      <div className="summaryHeader">
        <div>
           <FilterComponent filterByType={filterByType} setFilterByType={setFilterByType}/>
        </div>
      </div>

      <div>
        <Table title={() => <Title level={3}>Summary</Title>} columns={columns} dataSource={filteredData} />
      </div>
    </div>
  );
}

export default Summary;