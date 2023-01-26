import React from "react";
import { Collapse } from "antd";

import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'

const { Panel } = Collapse;

function Manual() {
  return (
    <div>
      <Collapse accordion={true} className='collapse'>
        <Panel header="Summary" key="1">
          <p className="manualTxt">
            In this page the user can input costs and income by clicking on the
            appropriate buttons. The user should choose category from the list,
            input cost/income name and amount, then it will be shown on summary table,
            which includes the category, type and amount of cost and income components.
            The user also have an opportunity to filter all costs and income by amount
            and type in ascending or descending order and also separate current and upcoming
            costs and income.
          </p>
        </Panel>
        <Panel header="History" key="2">
          <p className="manualTxt">
            This page introduces user’s costs and income by categories. The card contains
            information about changes in costs and income, date, amount, name and category.
            The user have an opportunity to edit and delete cards in this page. There are also many
            opportunities that allows the user to filter cards by amount, cost or income components
            and by date (daily, monthly, annual). There is also an option that allows searching cards
            by category name.
          </p>
        </Panel>
        <Panel header="Categories" key="3">
          <p className="manualTxt">
            This page allows the user to create new cost or income categories. It may be done by clicking
            on the appropriate button, choosing category type (cost or income), adding name and type.
            Afterwards it will be shown on summary table, which includes cost or income components’
            category and type. In this page user have an opportunity to edit, delete and filter created
            categories.
          </p>
        </Panel>
        <Panel header="Charts" key="4">
          <p className="manualTxt">
            This page charts gives an opportunity to get information about incoming, expenses,
            which part of incoming the user pays for each expense and how user manage income by month.
          </p>
        </Panel>
        <Panel header="About us" key="5">
          <p className="manualTxt">
            Financial Management Application gives an opportunity to manage funds more effectively.
            The user can import the total information about daily income and costs, and application
            will help receiving comprehensive reports about daily, monthly, annual costs and income.
            It also gives an opportunity to illustrate costs and income on graphs, which helps to collect
            comprehensive information about all cost and income components in total.
          </p>
          <h3>On this program works</h3>
          <div className="members">
            <div className="member">
              <h4>Davit Sahakyan</h4>
              <div className="social">
                <a href='https://github.com/davitSahakyan' target='_blank'><GithubOutlined /></a>
                <a href='https://www.linkedin.com/in/davit-sahakyan-364a51184/' target='_blank'><LinkedinOutlined /></a>
              </div>
            </div>
            <div className="member">
              <h4>Narek Yeritsyan</h4>
              <div className="social">
                <a href='https://github.com/Narek003' target='_blank'><GithubOutlined /></a>
                <a href='https://www.linkedin.com/in/narek-yeritsyan-449a61255/' target='_blank'><LinkedinOutlined /></a>
              </div>
            </div>
            <div className="member">
              <h4>Mane Sofyan</h4>
              <div className="social">
                <a href='https://github.com/Mane45' target='_blank'><GithubOutlined /></a>
                <a href='https://www.linkedin.com/in/mane-sofyan-b6120b14a/' target='_blank'><LinkedinOutlined /></a>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
export default Manual;