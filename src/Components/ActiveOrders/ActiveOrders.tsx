import React, { Fragment } from "react";
import OrderInfo from "./OrderInfo";
import "./ActiveOrders.css";
import { Order } from "../../Shared/Interfaces/Order.Interface";

interface Props {
  orders: Array<Order>;
  handleCompleteOrder: (event: string) => void;
}

export default class ActiveOrders extends React.Component<Props> {
  render() {
    const listOfOrders =
      this.props.orders.length > 0
        ? this.props.orders.map((s, i) => (
            <Fragment key={i}>
              <OrderInfo
                key={i}
                order={s}
                completeOrder={this.props.handleCompleteOrder}
              />
            </Fragment>
          ))
        : null;
    return <Fragment>{listOfOrders}</Fragment>;
  }
}
