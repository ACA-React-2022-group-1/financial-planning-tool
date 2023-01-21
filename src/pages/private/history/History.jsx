import "./History.css";
import { Select, Space } from "antd";
import { Input } from "antd";
import { useState } from "react";
import editIcon from "../../../assets/images/edit-icon.png";
import garbageIcon from "../../../assets/images/garbage-icon.png";

function History() {
  const [filterCart, setFilterCart] = useState({
    sortByAmount: "Ascending order",
    type: "All",
    period: "Whole Period",
    view: "Current State",
    searchValue: "",
  });

  const data = [
    {
      id: "0236d1e5-90f3-412d-84ad-057a1334a805",
      type: "expense",
      name: "Concert",
      categoryId: "148884b0-a60e-4ec6-ba14-83b3944bdfb0",
      amount: 310,
      date: "2020-03-21T08:43:00.000Z",
    },
    {
      id: "851f66f3-9404-4657-bf8c-e5bcd296f823",
      type: "expense",
      name: "Groceries",
      categoryId: "fa791c9b-4ea1-449e-8f2e-caf6172a5321",
      amount: 120,
      date: "2020-04-09T08:43:00.000Z",
    },
    {
      id: "3cd34bfa-93fa-4438-b80d-dd00744cd56c",
      type: "expense",
      name: "HealthCare",
      categoryId: "37265e9e-92f0-467c-8285-ab2ec288cd5c",
      amount: 530,
      date: "2020-04-05T08:44:00.000Z",
    },
    {
      id: "c3273f68-d284-4433-9ad0-ca0d7df81d09",
      type: "expense",
      name: "Utilities",
      categoryId: "8b3ff5f8-63c2-4935-947c-50ec8dfe604c",
      amount: 340,
      date: "2020-03-28T08:44:00.000Z",
    },
    {
      id: "9ae8755c-1e67-4fc8-be24-f6ef23950454",
      type: "income",
      name: "Programming",
      categoryId: "d445bf76-8ceb-4573-bf02-9fd67c9fba93",
      amount: 1000,
      date: "2020-03-14T08:45:00.000Z",
    },
    {
      id: "696f7890-f370-4517-b645-0a77312f6bad",
      type: "income",
      name: "Electronics store",
      categoryId: "d445bf76-8ceb-4573-bf02-9fd67c9fba93",
      amount: 850,
      date: "2020-04-01T08:45:00.000Z",
    },
  ];
  console.log(filterCart);

  function viewHandleChange(value) {
    setFilterCart({ ...filterCart, view: value });
  }
  function orderHandleChange(value) {
    setFilterCart({ ...filterCart, sortByAmount: value });
  }

  function statusHandleChange(value) {
    setFilterCart({ ...filterCart, type: value });
  }

  function durationHandleChange(value) {
    setFilterCart({ ...filterCart, period: value });
  }
  function searchHandleChange(ev) {
    setFilterCart({ ...filterCart, searchValue: ev.target.value });
  }

  function RenderCarts() {
    let cartsInfo;
    if (filterCart.type === "All") {
      cartsInfo = data;
    } else {
      cartsInfo = data.filter((filtered) => {
        if (filtered.type === filterCart.type.toLocaleLowerCase()) {
          return filtered;
        }
      });
    }
    if (filterCart.sortByAmount === "Ascending order") {
      cartsInfo = cartsInfo.sort((a, b) => a.amount - b.amount);
    } else {
      cartsInfo = cartsInfo.sort((a, b) => b.amount - a.amount);
    }
    if (filterCart.searchValue) {
      cartsInfo = cartsInfo.filter(
        (obj) =>
          obj.name
            .slice(0, filterCart.searchValue.length)
            .toLocaleLowerCase() === filterCart.searchValue.toLocaleLowerCase()
      );
    }
    console.log(cartsInfo);
    return cartsInfo.map((obj) => {
      return (
        <div className="cart" key={obj.id}>
          <div className="headerPartOfCart">
            <p>{obj.name}</p>
            <div className="headerIcons">
              <img src={editIcon} alt="" />
              <img src={garbageIcon} alt="" />
            </div>
          </div>
          <div className="footerPartOfCart">
            <p>{obj.type}</p>
            <p>{obj.type === "expense" ? -obj.amount : obj.amount}</p>
            <p>{`${obj.date.slice(0, 10).split("-").reverse().join(".")}`}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="history">
      <Space wrap>
        <Select
          className="order"
          defaultValue={filterCart.sortByAmount}
          style={{
            width: 160,
          }}
          onChange={orderHandleChange}
          options={[
            {
              value: "Ascending order",
              label: "Ascending order",
            },
            {
              value: "Desascending order",
              label: "Descending order",
            },
          ]}
        />
        <Select
          className="type"
          defaultValue={filterCart.type}
          style={{
            width: 160,
          }}
          onChange={statusHandleChange}
          options={[
            {
              value: "All",
              label: "All",
            },
            {
              value: "Expense",
              label: "Expense",
            },
            {
              value: "Income",
              label: "Income",
            },
          ]}
        />
        <Select
          className="period"
          defaultValue={filterCart.period}
          style={{
            width: 160,
          }}
          onChange={durationHandleChange}
          options={[
            {
              value: "Whole Period",
              label: "Whole Period",
            },
            {
              value: "Daily",
              label: "Daily",
            },
            {
              value: "Monthly",
              label: "Monthly",
            },
            {
              value: "Yearly",
              label: "Yearly",
            },
          ]}
        />
        <Select
          className="view"
          defaultValue={filterCart.view}
          style={{
            width: 160,
          }}
          onChange={viewHandleChange}
          options={[
            {
              value: "Current State",
              label: "Current State",
            },
            {
              value: "Upcoming State",
              label: "Upcoming State",
            },
          ]}
        />
        <Input
          placeholder="Search in history"
          onChange={searchHandleChange}
          style={{ width: 160 }}
        />
      </Space>
      <div className="carts">
        <RenderCarts />
      </div>
    </div>
  );
}
export default History;
