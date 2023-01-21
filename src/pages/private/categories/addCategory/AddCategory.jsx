import React from 'react';
import { Button, Modal, Form, Input, Select, Typography } from 'antd';
import { useState } from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { v4 as uuidv4} from 'uuid';

import './AddCategory.css'
import Column from 'antd/es/table/Column';
import { DataContext } from '../../homeLayout/HomeLayout';

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


const AddCategory = () => {
  const {categories, addCategory} = React.useContext(DataContext)
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);


// on submit click is succes
  const onFinish = (values) => {
    const uniqueId = uuidv4();
    setIsModalOpen(false);
    const createdCategory = {...values, categoryId: uniqueId, key: uniqueId}
    addCategory(createdCategory)
    form.resetFields()
  };

  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };
  return (
    <>
      <Button type="primary" icon={<AppstoreAddOutlined />} style={{backgroundColor: "#55a9a6"}} onClick={showModal}>Add Category</Button>

      <Modal 
      title={<Title level={3}>Add Category</Title>}
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
                    name="type"
                    label="Type"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Select
                    placeholder="Select a type"
                    allowClear
                    >
                    <Option value="income">Income</Option>
                    <Option value="expense">Expense</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
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
export default AddCategory;