import React, { useState } from "react";
import { Avatar, Card, Skeleton, Switch, Button, Typography } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
    EditOutlined, 
    EllipsisOutlined,
     SettingOutlined
  } from '@ant-design/icons';
import AddIncomeOrExpense from '../addIncomeOrExpense/AddIncomeOrExpense';

const { Meta } = Card;  
const { Title } = Typography;

export default function HeaderComponent ({collapsed, setCollapsed, logOut}) {
    const [loading, setLoading] = useState(false);
    const onChange = (checked) => {
        setLoading(!checked);
      };

    return(
        <div className='headerContainer'>
            <div>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                })}  
            </div>
            <div className="actionButtonsContainer">
                <AddIncomeOrExpense />
                {/* <Button type="primary" size="large">Add Income</Button>
                <Button type="dashed" size="large" danger>Add Expence</Button> */}
            </div>
            <div className="balanceInfoWrapper">
                <Card style={{ width: 200, height: 120, marginRight: 10 }} loading={loading}>
                    <Meta title="Income" />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#57f542' }}>1,850 $</Title>
                        <div className="flexBetween">
                            <div>Upcoming </div>
                            <div>+6,500</div>
                        </div>
                        <div className="flexBetween">
                            <div>Total</div>
                            <div>+8,350</div>
                        </div>
                    </div>
                </Card>
                <Card style={{ width: 200, height: 120, marginRight: 10 }} loading={loading} >
                    <Meta title="Expense" />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#f54242' }}>-1,300 $</Title>
                        <div className="flexBetween">
                            <div>Upcoming </div>
                            <div>0</div>
                        </div>
                        <div className="flexBetween">
                            <div>Total</div>
                            <div>-1,300</div>
                        </div>
                    </div>
                </Card>
                <Card style={{ width: 200, height: 120 }} loading={loading} >
                    <Meta title="Balance" />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#55a9a6' }}>550 $</Title>
                        <div className="flexBetween">
                            <div>Upcoming </div>
                            <div>6,500</div>
                        </div>
                        <div className="flexBetween">
                            <div>Total</div>
                            <div>7,050</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}