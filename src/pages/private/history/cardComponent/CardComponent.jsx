import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import moment from "moment/moment";
import "./CardComponent.css";

function CardComponent({data}) {
  const {name, amount, date, categoryName} = data
  debugger;
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        className="card"
        title={
          <div className="d-flex-card">
            <div>{name}</div>
            <div>
              <Button
                className="outlinedGreenBtn"
                icon={<EditOutlined />}
                size={"medium"}
              >
              </Button>
              <Button style={{marginLeft: "5px"}} danger icon={<DeleteOutlined />} size={"medium"}>
              </Button>
            </div>
          </div> 

        }
        bordered={false}
        style={{
          width: 300,
        }}
      > 
        <div className="icons">
            
          </div>
          <div className="d-flex-card">
            <div className="categoryName">{categoryName}</div>
            <div>{amount}$</div>
            <div>{moment(date).format('MMMM d, YYYY')}</div>
          </div>
      </Card>
    </div>
  );
}
export default CardComponent;
