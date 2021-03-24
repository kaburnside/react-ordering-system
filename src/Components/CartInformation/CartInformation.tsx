import React, { Fragment } from "react";
import { Sandwich } from "../../Shared/Interfaces/Sandwich.Interface";
import "./CartInformation.css";

interface Props {
  selectedSandiwches: Array<Sandwich>;
  total: number;
  removeFromCart: (event: any) => void;
}

export default class CartInformation extends React.Component<Props> {
  render() {
    const total = (
      <div className="total-price-container">
        <span className="total-cost-title" aria-labelledby="Total Cost Title">
          Total Cost:
        </span>
        <span className="total-cost" aria-labelledby="Total Cost">
          ${this.props.total}
        </span>
      </div>
    );
    const cart = this.props.selectedSandiwches.map((s, i) => (
      <Fragment key={i}>
        <div className="sandwich-container" key={i}>
          <div className="sandwich-name">{s.name}</div>
          <div className="sandwich-cost">${s.price}</div>
          <div className="add-to-cart">
            <button
              onClick={this.props.removeFromCart}
              className="order-button"
              value={JSON.stringify(s)}
            >
              -
            </button>
          </div>
        </div>
      </Fragment>
    ));
    return (
      <Fragment>
        {cart}
        {total}
      </Fragment>
    );
  }
}
