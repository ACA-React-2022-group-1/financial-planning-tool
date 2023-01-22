import React, { useState } from "react";
import { Space, Table, Tag, Button, Typography  } from 'antd';
import { UpSquareOutlined, DownSquareOutlined } from '@ant-design/icons';
import "./Summary.css";

import FilterComponent from '../../../components/filterComponent'
import { DataContext } from "../homeLayout/HomeLayout";


const { Title } = Typography;
const columns = [
  {
    title: 'Category',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
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
    title: 'Amount',
    className: 'column-amount',
    key: 'amount',
    dataIndex: 'amount',
    align: 'right',
    sorter: (a, b) => a.amount - b.amount,
    render: (_, record) =>{ 
       return <span>{record.amount}</span>
    },
  },
];

function Summary() {
  const [filterByType, setFilterByType] = useState("all");
  const {categories , amounts} = React.useContext(DataContext)

  function calculateCategoriesWithAmount() {
    const categoryIdes = categories.map( item => {
    return {...item, categoryId: item.categoryId, name: item.name}
    })
    const categoriesWithAmount = categoryIdes.map( item => {
      let finalAmount = 0;
      console.log(amounts, 'amounts')
      amounts.forEach(element => {
        if( element.categoryId === item.categoryId) {
        finalAmount = finalAmount + element.amount
        }
      })
      return {...item, amount: finalAmount}
    })
    return categoriesWithAmount
  }



  let filteredData = calculateCategoriesWithAmount().filter( item => {
    if (filterByType === 'all') {
      return true
    }
    return item.type === filterByType
  })


  return (
    <div>
      <div className="summaryHeader">
        <div>
           <FilterComponent filterByType={filterByType} setFilterByType={setFilterByType}/>
        </div>
      </div>

      <div>
        <Table 
        title={() => <Title level={3}>Summary</Title>} 
        columns={columns} 
        dataSource={filteredData}
        pagination={{ defaultPageSize: 7, showSizeChanger: true, pageSizeOptions: ['7', '14', '21']}}
         />
      </div>
    </div>
  );
}

export default Summary;