import React, { useState } from 'react';
import './Charts.css'
import { Mix } from '@ant-design/plots';
import { DataView } from '@antv/data-set';
import { DataContext } from '../homeLayout/HomeLayout'
import { ContactsOutlined } from '@ant-design/icons';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
function Charts() {
  const { categories, amounts, addCategory, incomeCategories, expenseCategories, addAmountByCategory } = React.useContext(DataContext)

  let allIncomeAmounts = []
  incomeCategories.forEach( (incomeCategorie) => {
    let eachCategoriAmounts = amounts.filter(item =>  item.categoryId === incomeCategorie.categoryId );
    let eachCategoriAmountsNewObj = eachCategoriAmounts.map( item =>  {
     return {amount: item.amount , month: new Date(item.date.seconds * 1000).toLocaleString('en-us', { month: 'long' })}
    })
    allIncomeAmounts.push(...eachCategoriAmountsNewObj)
  } )

  let allexpenseAmounts = []
  expenseCategories.forEach( (expenseCategorie) => {
    let eachCategoriAmounts = amounts.filter(item =>  item.categoryId === expenseCategorie.categoryId );
    let eachCategoriAmountsNewObj = eachCategoriAmounts.map( item =>  {
     return {amount: item.amount , month: new Date(item.date.seconds * 1000).toLocaleString('en-us', { month: 'long' })}
    })
    allexpenseAmounts.push(...eachCategoriAmountsNewObj)
  } )



  let newData = []
  let dataByMonth = months.forEach( month => {
     let monthlyAmount = 0;
     let monthlyFilteredData = allIncomeAmounts.filter( singleItem => singleItem.month === month)
     if(monthlyFilteredData.length) {
        monthlyFilteredData.forEach( data => {
              monthlyAmount = monthlyAmount + data.amount
      })
      newData.push([month, monthlyAmount])
     }
  })


  let expenseData = []
  let expenseDataByMonth = months.forEach( month => {
     let monthlyAmount = 0;
     let monthlyFilteredData = allexpenseAmounts.filter( singleItem => singleItem.month === month)
     if(monthlyFilteredData.length) {
        monthlyFilteredData.forEach( data => {
              monthlyAmount = monthlyAmount + data.amount
      })
      expenseData.push([month, monthlyAmount])
     }
  })
   
  
  let finalData = []
   months.forEach( (monthName) => {
    let newPart = []
    let elem1 = newData.find( (item) => item[0] === monthName)
    let elem2 = expenseData.find( (item) => item[0] === monthName)
    if(elem1 || elem2) {
      newPart.push(monthName)
      elem1 ? newPart.push(elem1[1]) : newPart.push(0);
      elem2 ? newPart.push(-elem2[1]) : newPart.push(0);
    } 
    if(newPart.length) {
      finalData.push(newPart)
    }
  })

  const config = {
    height: 500,
    padding: 'auto',
    tooltip: {
      showMarkers: false,
    },
    views: [
      {
        data: finalData.map((d) => ({
          type: d[0],
          value: d[1],
        })),
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.5,
            y: 0.4,
          },
        },
        coordinate: {
          type: 'theta',
          cfg: {
            radius: 0.85,
          },
        },
        axes: {
          value: {
            title: {
              text: 'Expenses',
            },
            grid: null,
            tickLine: null,
            line: false,
            ticks: false,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: '1',
            yField: 'value',
            colorField: 'type',
            mapping: {},
            adjust: {
              type: 'stack',
            },
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-highlight',
          },
        ],
      },
      {
        data: new DataView()
          .source(
            finalData.map((d) => ({
              type: d[0],
              income: d[1],
              expense: d[2],
            })),
          )
          .transform({
            type: 'fold',
            fields: ['income', 'expense'],
            key: 'gender',
            value: 'value',
          }).rows,
        region: {
          start: {
            x: 0.5,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.45,
          },
        },
        coordinate: {
          cfg: {
            isTransposed: true,
          },
        },
        axes: {
          value: false,
        },
        geometries: [
          {
            type: 'interval',
            xField: 'type',
            yField: 'value',
            colorField: 'gender',
            mapping: {},
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
          },
        ],
      },
      {
        data: finalData.map((d) => ({
          mounth: d[0],
          income: d[1],
        })),
        region: {
          start: {
            x: 0,
            y: 0.52,
          },
          end: {
            x: 0.48,
            y: 1,
          },
        },
        axes: {
          mounth: {
            title: {
              text: 'Incomings',
            },
          },
        },
        meta: {},
        geometries: [
          {
            type: 'area',
            xField: 'mounth',
            yField: 'income',
            mapping: {},
          },
          {
            type: 'line',
            xField: 'mounth',
            yField: 'income',
            mapping: {
              style: {
                lineWidth: 0.5,
              },
            },
          },
        ],
      },
      {
        data: new DataView()
          .source(
            finalData.map((d) => ({
              mounth: d[0],
              income: d[1],
              expense: d[2],
            })),
          )
          .transform({
            type: 'fold',
            fields: ['income', 'expense'],
            key: 'money',
            value: 'turnout',
          }).rows,
        region: {
          start: {
            x: 0.52,
            y: 0.52,
          },
          end: {
            x: 1,
            y: 1,
          },
        },
        axes: {
          mounth: {
            title: {
              text: 'Turnout by income/expense',
            },
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: 'mounth',
            yField: 'turnout',
            colorField: 'money',
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
            mapping: {},
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-sibling-highlight',
          },
        ],
      },
    ],
  };
  return <Mix {...config} />;
}
export default Charts