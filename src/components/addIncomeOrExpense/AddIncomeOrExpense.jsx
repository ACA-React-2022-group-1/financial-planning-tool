import React from 'react';
import { Button, Modal, Form, Input, Select, Typography, InputNumber, DatePicker  } from 'antd';
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
  const {categories, addCategory} = React.useContext(DataContext)
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("income")


// on submit click is succes
  const onFinish = (values) => {
    // const uniqueId = uuidv4();
    setIsModalOpen(false);
    // const createdCategory = {...values, categoryId: uniqueId, key: uniqueId}
    // addCategory(createdCategory)
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
      title={<Title level={3} style={{color: modalType === "income" ? "#57f542" : "#f54242"}}>Add {modalType}</Title>}
      destroyOnClose={true} 
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
                          <Select.Option value="demo">this must be dinamic</Select.Option>

                        </Select>
                    </Form.Item>


                    <Form.Item label="Input">
                        <Input />
                    </Form.Item>
                    <Form.Item label="InputNumber">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="DatePicker">
                        <DatePicker />
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