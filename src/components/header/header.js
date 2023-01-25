import React, { useEffect, useState } from "react";
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
import { DataContext } from "../../pages/private/homeLayout/HomeLayout";

const { Meta } = Card;  
const { Title } = Typography;

export default function HeaderComponent ({collapsed, setCollapsed}) {
    const {categories, amounts, addCategory, incomeCategories, expenseCategories, addAmountByCategory  } = React.useContext(DataContext)
    const [loading, setLoading] = useState(false);
    const [categoriesWithAmount, setCategoriesWithAmount] = useState([])
    const onChange = (checked) => {
        setLoading(!checked);
      };  

    useEffect( () => {
        calculateCategoriesWithAmount()
    },[amounts])  

    function calculateCategoriesWithAmount() {
    const categoryIdes = categories.map( item => {
    return {...item, categoryId: item.categoryId, name: item.name}
    })
    const categoriesWithAmount = categoryIdes.map( item => {
        let currenMonthAmount = 0;
        let upcomingAmount = 0;
        console.log(amounts, 'amounts')
        amounts.forEach(element => {
        const currentMonth = new Date().getMonth();  
        const amountsMonth = new Date(element.date.seconds * 1000).getMonth();  
        if( element.categoryId === item.categoryId && currentMonth === amountsMonth) {
            currenMonthAmount = currenMonthAmount + element.amount
        } else if(element.categoryId === item.categoryId && currentMonth !== amountsMonth) {
            upcomingAmount = upcomingAmount + element.amount
        }
        })
        return {...item, currenMonthAmount ,upcomingAmount }
    })
    setCategoriesWithAmount(categoriesWithAmount)
    calculateIncomeExpenseBalance(categoriesWithAmount)
    return categoriesWithAmount
    }


    function calculateIncomeExpenseBalance(newCategoriesWithAmount) {
       console.log(newCategoriesWithAmount);
    //    newCategoriesWithAmount.map()
    }

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
                            {/* <div>Upcoming </div>
                            <div>+6,500</div> */}
                        </div>
                        <div className="flexBetween">
                            {/* <div>Total</div>
                            <div>+8,350</div> */}
                        </div>
                    </div>
                </Card>
                <Card style={{ width: 200, height: 120, marginRight: 10 }} loading={loading} >
                    <Meta title="Expense" />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#f54242' }}>-1,300 $</Title>
                        <div className="flexBetween">
                            {/* <div>Upcoming </div>
                            <div>0</div> */}
                        </div>
                        <div className="flexBetween">
                            {/* <div>Total</div>
                            <div>-1,300</div> */}
                        </div>
                    </div>
                </Card>
                <Card style={{ width: 200, height: 120 }} loading={loading} >
                    <Meta title="Balance" />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#55a9a6' }}>550 $</Title>
                        <div className="flexBetween">
                            {/* <div>Upcoming </div>
                            <div>6,500</div> */}
                        </div>
                        <div className="flexBetween">
                            {/* <div>Total</div>
                            <div>7,050</div> */}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}