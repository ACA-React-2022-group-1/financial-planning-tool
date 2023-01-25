import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import moment from "moment/moment";
import "./CardComponent.css";

function CardComponent({data}) {
  const {name, amount, date, catgoryName} = data
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        className="card"
        title={name}
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>{catgoryName}</p>
        <p>{amount}$</p>
        <p>{moment(date).format('MMMM d, YYYY')}</p>
        <div className="icons">
          <Button
            className="outlinedGreenBtn"
            icon={<EditOutlined />}
            size={"small"}
          >
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} size={"small"}>
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}
export default CardComponent;
