import React, { Fragment } from "react";
import "./SandwichInformation.css";
import { Sandwich } from "../../Shared/Interfaces/Sandwich.Interface";
import { Inventory } from "../../Shared/Interfaces/Inventory.Interface";

interface Props {
  sandwich: Sandwich;
  inventory: Inventory;
  addToCart: any;
}

export default class MenuItems extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      sandwich: {},
      inventory: {}
    };
  }

  /**
   * Loops through sandwich ingredients and compare to inventory
   */
  isAvailable() {
    for (const invItem in this.props.sandwich.ingredients) {
      const ingre = invItem;
      const availableIngredient = this.props.inventory[ingre];
      if (availableIngredient < this.props.sandwich.ingredients[ingre]) {
        return <span>Item Unavailable</span>;
      }
    }
    return (
      <button
        aria-label="Add To Cart"
        onClick={this.props.addToCart}
        className="order-button"
        value={JSON.stringify(this.props.sandwich)}
      >
        +
      </button>
    );
  }

  render() {
    const ingredients = Object.keys(this.props.sandwich.ingredients).map(
      (s, i) => (
        <Fragment key={i}>
          <li key={i}>{s}</li>
        </Fragment>
      )
    );
    const available = this.isAvailable();

    return (
      <div className="sandwich-container">
        <div className="sandwich-name">{this.props.sandwich.name}</div>
        <div className="sandwich-ingredients">
          <ul>{ingredients}</ul>
        </div>
        <div className="sandwich-cost">${this.props.sandwich.price}</div>
        <div className="add-to-cart">{available}</div>
      </div>
    );
  }
}
