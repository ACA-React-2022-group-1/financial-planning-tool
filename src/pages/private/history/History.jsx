import "./History.css";
import { List, Pagination, Radio, Select, Space } from "antd";
import { Input } from "antd";
import React, { useState } from "react";
import { DataContext } from "../homeLayout/HomeLayout";
import CreateCard from "./cardComponent/CardComponent";
import CardComponent from "./cardComponent/CardComponent";

function History() {
  const { amounts, categories } = React.useContext(DataContext);
  const [sortingType, setSortingType] = useState("ascending");
  const [filtringType, setFilteringType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const newAmounts = amounts.map((item) => {
    let newData = new Date(item.date.seconds * 1000);
    let categoryName = "";

    categories.forEach((category) => {
      if (category.categoryId === item.categoryId) {
        categoryName = category.name;
      }
    });
    return { ...item, date: newData, categoryName };
  });

  console.log(newAmounts);

  return (
    <div className="history">
      <Space wrap>
        <div>
          <Radio.Group
            value={filtringType}
            onChange={(e) => setFilteringType(e.target.value)}
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="axpense">Expense</Radio.Button>
            <Radio.Button value="income">Income</Radio.Button>
          </Radio.Group>
        </div>
        <Select
          className="order"
          defaultValue={sortingType}
          style={{
            width: 160,
          }}
          onChange={(e) => setSortingType(e.target.value)}
          options={[
            {
              value: "ascending",
              label: "Ascending order",
            },
            {
              value: "desascending",
              label: "Descending order",
            },
          ]}
        />
        <Input
          placeholder="Search in history"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 160 }}
        />
      </Space>

      <List
        pagination={{
          defaultPageSize: 4,
        }}
        dataSource={newAmounts}
        renderItem={(data) => (
          <List.Item>
            <CardComponent data={data} />
          </List.Item>
        )}
      />
    </div>
  );
}
export default History;
