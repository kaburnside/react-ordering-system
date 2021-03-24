import React, { Fragment } from "react";
import "./OrderInfo.css";
import { Order } from "../../Shared/Interfaces/Order.Interface";

interface Props {
  completeOrder: (event: string) => void;
  order: Order;
}
export default class OrderInfo extends React.Component<Props> {
  /**
   * Check the order, if it is picked up it will return the picked up tag
   */
  isPickedUp() {
    const isPickedUp = this.props.order.pickedUp;
    return isPickedUp === false ? (
      <button
        aria-label="Set Order To Picked Up"
        onClick={this.props.completeOrder}
        className="complete-order-button"
        value={JSON.stringify(this.props.order)}
      >
        Pending
      </button>
    ) : (
      <p>Picked Up</p>
    );
  }

  render() {
    const sandwiches = this.props.order.orderItems.map((s, i) => (
      <Fragment key={i}>
        <li key={i}>{s}</li>
      </Fragment>
    ));
    const available = this.isPickedUp();

    return (
      <div className="info-container">
        <div className="order-information">
          <div className="order-info">
            <span title="ID">ID:</span>
            <p>{this.props.order.id}</p>
          </div>
          <div className="order-info">
            <span title="Name">Name:</span>
            <p>{this.props.order.customerName}</p>
          </div>
          <div className="order-info">
            <span title="Phone">Phone:</span>
            <p>{this.props.order.phone}</p>
          </div>
          <div className="order-info">
            <span title="Items">Items:</span>
            <ul className="order-items">{sandwiches}</ul>
          </div>
          <div className="order-info">
            <span title="Total">Total:</span>
            <p>${this.props.order.total}</p>
          </div>
          <div className="order-info">
            <span title="Status">Status:</span>
            {available}
          </div>
        </div>
      </div>
    );
  }
}
