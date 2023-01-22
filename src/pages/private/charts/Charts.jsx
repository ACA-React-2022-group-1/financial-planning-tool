import './Charts.css'
import { Mix } from '@ant-design/plots';
import { DataView } from '@antv/data-set';
function Charts() {
    const data = [
        ['Unitility', 51, 45, 6],
        ['Educational', 67, 39, 28],
        ['Transport', 19, 11, 8],
        ['Bank', 47, 33, 14],
        ['Entertainment', 32, 20, 12],
        ['Clothes', 70, 20, 50],
      ];
      const mounthData = [
        ['March', 60, 176, 35, 25],
        ['April', 51, 136, 25, 26],
        ['May', 73, 196, 35, 38],
        ['Jun', 84, 315, 43, 41],
        ['July', 79, 203, 36, 33],
        ['August', 89, 286, 41, 48],
      ];
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
                min: 40,
                max: 90,
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
                  income: d[3],
                  expense: d[4],
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