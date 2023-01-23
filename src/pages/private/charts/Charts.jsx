import React from 'react';
import './Charts.css'
import { Mix } from '@ant-design/plots';
import { DataView } from '@antv/data-set';
import { DataContext } from '../homeLayout/HomeLayout'

const mounth = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5:'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11:'December'
}
function Charts() {
  const { categories, amounts, addCategory, incomeCategories, expenseCategories, addAmountByCategory } = React.useContext(DataContext)
  let currentIncoming = 0;
  let data = [];
  let mounthData = [];
  const currentMonth = new Date().getMonth();
  incomeCategories.forEach(category => {
    let value = amounts.filter(item => {
      return category.categoryId === item.categoryId
    });
    let num = new Date(value[0].date.seconds * 1000).getMonth();
    if(currentMonth === num) {currentIncoming += value[0].amount};
    mounthData.push([mounth[new Date(value[0].date.seconds * 1000).getMonth()], value[0].amount, value[0].amount]);
  });
  expenseCategories.forEach(category => {
    let value = amounts.filter(item => {
      return category.categoryId === item.categoryId
    })
    data.push([category.name, -value[0].amount, -value[0].amount, currentIncoming]);
    mounthData.map(item => {
      item.push(-value[0].amount)
    })
  });
  // const data1 = [
  //   ['Unitility', 51, 45, 6],
  //   ['Educational', 67, 39, 28],
  //   ['Transport', 19, 11, 8],
  //   ['Bank', 47, 33, 14],
  //   ['Entertainment', 32, 20, 12],
  //   ['Clothes', 70, 20, 50],
  // ];
  // const mounthData1 = [
  //   ['March', 60, 3, 25],
  //   ['April', 51, 25, 26],
  //   ['May', 73, 35, 38],
  //   ['Jun', 84, 43, 41],
  //   ['July', 79, 36, 33],
  //   ['August', 89, 41, 48],
  // ];
  const config = {
    height: 500,
    padding: 'auto',
    tooltip: {
      showMarkers: false,
    },
    views: [
      {
        data: data.map((d) => ({
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
            data.map((d) => ({
              type: d[0],
              income: d[2],
              expense: d[3],
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
        data: mounthData.map((d) => ({
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
        meta: {
          income: {
            min: 10,
            max: 1000,
          },
        },
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
            mounthData.map((d) => ({
              mounth: d[0],
              income: d[2],
              expense: d[3],
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