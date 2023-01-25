import React from 'react';
import { Button, Modal, Form, Input, Select, Typography, InputNumber, DatePicker  } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { v4 as uuidv4} from 'uuid';

import './AddIncomeOrExpense.css'
import Column from 'antd/es/table/Column';
import { DataContext } from '../../pages/private/homeLayout/HomeLayout';

const { Option } = Select;
const { Title } = Typography;


// layout
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


const AddIncomeOrExpense = () => {
  const {categories, addCategory, incomeCategories, expenseCategories, addAmountByCategory} = React.useContext(DataContext)
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("income")


// on submit click is succes
  const onFinish = ({amount, date, name, type}) => {
    const uniqueId = uuidv4();
    let newAmount = modalType === "income" ? amount : -amount
    setIsModalOpen(false);
    const createdAmount = { amount: newAmount , date: new Date(date), name, categoryId: type, id: uniqueId, key: uniqueId}
    addAmountByCategory(createdAmount)
    form.resetFields()
  };

  
  const showModal = (type) => {
    setModalType(type)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };



  return (
    <>
      <Button type="primary" icon={<PlusSquareOutlined />} style={{color: "#57f542", borderColor: "#57f542"}} ghost onClick={() => showModal("income")}>Add Income</Button>
      <Button type="danger" icon={<MinusSquareOutlined />} style={{color: "#f54242", borderColor: "#f54242"}} ghost onClick={() => showModal("expense")}>Add Expense</Button>

      <Modal 
      title={<Title level={3} style={{color: 'white'}}>Add {modalType}</Title>}
      destroyOnClose={true}
      className={`incomeOrExpenseModal ${modalType === "income" ? "income" : "expense"}`}
      open={isModalOpen} 
      closable={false}
      centered={true}
      onCancel={handleCancel}
      footer={null}
      >
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                >

                    <Form.Item 
                       label="Category"
                       name="type"
                       rules={[
                       {
                          required: true,
                       },
                       ]}>
                        <Select placeholder="Select category"
                                allowClear>
                          {
                            modalType === "income" ? incomeCategories.map( item => <Select.Option key={item.categoryId} value={item.categoryId}>{item.name}</Select.Option>) : 
                                                     expenseCategories.map( item => <Select.Option key={item.categoryId} value={item.categoryId}>{item.name}</Select.Option>)          
                          }         
                          

                        </Select>
                    </Form.Item>

                    <Form.Item 
                      label="Name"
                      name="name"
                      rules={[
                      {
                        required: true,
                      },
                      ]}
                     >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                      label="Amount"
                      name="amount"
                      rules={[
                        {
                          required: true,
                        },
                        ]}
                      >
                        <InputNumber
                          prefix="$"
                          min={0}
                          />
                    </Form.Item>
                    <Form.Item 
                        label="Date"
                        name="date"
                        rules={[
                          {
                            required: true,
                          },
                          ]}
                        >
                        <DatePicker 
                        allowClear={true}
                        format="YYYY-MM-DD"
                        disabledDate={(current) => {
                          return moment().add(-1, 'days')  >= current ||
                               moment().add(4, 'month')  <= current;
                          }}
                        />
                    </Form.Item>

                <Form.Item {...tailLayout}>
                    <div className='actionButtonsContainer'>
                        <Button key="back" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button htmlType="submit" type="primary">
                          Save
                        </Button>
                    </div>

                </Form.Item>
            </Form> 
      </Modal>
    </>
  );
};
export default AddIncomeOrExpense;