import React, { useEffect, useState } from "react";
import { Avatar, Card, Skeleton, Switch, Button, Typography } from 'antd';
import  moment  from "moment";
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
    const [currenMonthIncome, setCurrenMonthIncome] = useState(null)
    const [upcomingIncome, setUpcomingIncome] = useState(null)
    const [currenMonthExpense, setCurrenMonthExpense] = useState(null)
    const [upcomingExpense, setUpcomingExpense] = useState(null)
    const onChange = (checked) => {
        setLoading(!checked);
      };  
    const currentMonthName = moment().format('MMMM')

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
       const incomeArray = newCategoriesWithAmount.filter( (item) => item.type === 'income');
       const expenseArray = newCategoriesWithAmount.filter( (item) => item.type === 'expense');
       const currenMonthIncome = incomeArray.reduce( (accumulator, currentValue) => accumulator + currentValue.currenMonthAmount, 0)
       setCurrenMonthIncome(currenMonthIncome)
       const upcomingIncome = incomeArray.reduce( (accumulator, currentValue) => accumulator + currentValue.upcomingAmount, 0)
       setUpcomingIncome(upcomingIncome)

       const currenMonthExpense = expenseArray.reduce( (accumulator, currentValue) => accumulator + currentValue.currenMonthAmount, 0)
       setCurrenMonthExpense(currenMonthExpense)
       const upcomingExpense = expenseArray.reduce( (accumulator, currentValue) => accumulator + currentValue.upcomingAmount, 0)
       setUpcomingExpense(upcomingExpense)
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
            </div>
            <div className="balanceInfoWrapper">
                <Card style={{ width: 200, height: 120, marginRight: 10 }} loading={loading}>
                    <Meta title={`Income for ${currentMonthName}`} />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#57f542' }}>{currenMonthIncome} $</Title>
                        <div className="flexBetween">
                            <div> upcoming </div>
                            <div>{upcomingIncome} $</div>
                        </div>
                        <div className="flexBetween">
                            <div>Total</div>
                            <div>+ {currenMonthIncome + upcomingIncome} $</div>
                        </div>
                    </div>
                </Card>
                <Card style={{ width: 200, height: 120, marginRight: 10 }} loading={loading} >
                    <Meta title={`Expense for ${currentMonthName}`} />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#f54242' }}>{currenMonthExpense} $</Title>
                        <div className="flexBetween">
                            <div>Upcoming </div>
                            <div>{upcomingExpense}</div>
                        </div>
                        <div className="flexBetween">
                            <div>Total</div>
                            <div>{currenMonthExpense + upcomingExpense}</div>
                        </div>
                    </div>
                </Card>
                <Card style={{ width: 200, height: 120 }} loading={loading} >
                    <Meta title={`Balance for ${currentMonthName}`} />
                    <div className="incomeInfoContainer">
                        <Title level={3} style={{ color: '#55a9a6' }}>{currenMonthIncome + currenMonthExpense} $</Title>
                        <div className="flexBetween">
                            <div>Upcoming </div>
                            <div>{upcomingIncome + upcomingExpense} $</div>
                        </div>
                        <div className="flexBetween">
                            <div>Total</div>
                            <div>{currenMonthIncome + upcomingIncome + currenMonthExpense + upcomingExpense} $</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}