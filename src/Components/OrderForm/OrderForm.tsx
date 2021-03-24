import React, { Fragment } from "react";
import "./OrderForm.css";
import CartInformation from "../CartInformation/CartInformation";
import SandwichInformation from "../SandwichInformation/SandwichInformation";
import { Sandwich } from "../../Shared/Interfaces/Sandwich.Interface";
import { Inventory } from "../../Shared/Interfaces/Inventory.Interface";
import { addToInventory, subtractInventory } from "../../Services/DataService";
import { Order } from "../../Shared/Interfaces/Order.Interface";

interface State {
  selectedSandiwches: Array<Sandwich>;
  menuItems: Array<Sandwich>;
  customerName: string;
  phoneNumber: string;
  inventory: Inventory;
  totalPrice: number;
}

interface Props {
  createOrder: (event: any) => void;
  inventory: Inventory;
  availableMenuItems: Array<Sandwich>;
  customerNameChange: (event: string) => void;
  customerPhoneChange: (event: string) => void;
}

export default class OrderForm extends React.Component<Props, State> {
  state: Readonly<State> = {
    selectedSandiwches: [],
    menuItems: [],
    customerName: "",
    phoneNumber: "",
    inventory: {},
    totalPrice: 0
  };

  componentDidMount() {
    this.setState({ inventory: this.props.inventory });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handlePhoneInputChange = this.handlePhoneInputChange.bind(this);
  }

  /**
   * Creates an Order object and sends to parent for processing
   * @param event
   */
  handleSubmit(event) {
    if (
      this.state.customerName === "" ||
      this.state.selectedSandiwches.length === 0 ||
      this.state.phoneNumber === ""
    ) {
      alert("Order not complete");
      return;
    }
    let sandwiches = [];
    this.state.selectedSandiwches.forEach((sandwich) => {
      sandwiches.push(sandwich.name);
    });
    const order: Order = {
      orderItems: sandwiches,
      customerName: this.state.customerName,
      phone: this.state.phoneNumber,
      total: this.state.totalPrice
    };
    event.preventDefault();
    this.props.createOrder(order);
    this.clearForm();
  }
  /**
   * Adds the selected item to the cart and calls the data service to remove
   * the required ingredients from the inventory
   * @param e Menu Item to be added to the cart
   */
  handleAddToCart = (e) => {
    // Pass added menu item to service and return items that are available?
    e.preventDefault();
    const sammies: Array<Sandwich> = this.state.selectedSandiwches;
    const selectedSandiwch: Sandwich = JSON.parse(e.target.value);
    sammies.push(selectedSandiwch);
    const updatedInventory = subtractInventory(selectedSandiwch.ingredients);
    const totalPrice = (
      Number(this.state.totalPrice) + Number(selectedSandiwch.price)
    ).toFixed(2);
    this.setState({
      totalPrice: Number(totalPrice),
      inventory: updatedInventory,
      selectedSandiwches: sammies
    });
    // update the backend with the changes and get updated available sandwiches
  };

  /**
   * Removes the selected menu item from the cart and adds the ingredients back to the inventory
   * @param e Item to be removed from the cart
   */
  handleRemoveFromCart = (e) => {
    e.preventDefault();
    const selectedSammies: Array<Sandwich> = this.state.selectedSandiwches;
    const removeSandwich: Sandwich = JSON.parse(e.target.value);
    const itemIndex = selectedSammies.findIndex((e) => {
      return e.name === removeSandwich.name;
    });
    selectedSammies.splice(itemIndex, 1);
    const totalPrice = (
      Number(this.state.totalPrice) - Number(removeSandwich.price)
    ).toFixed(2);
    const updatedInventory = addToInventory(removeSandwich.ingredients);
    this.setState({
      inventory: updatedInventory,
      totalPrice: Number(totalPrice),
      selectedSandiwches: selectedSammies
    });
    // This is where we would update the backend with the changes
  };

  /**
   * Clears the form and resets the states
   */
  clearForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.setState({
      selectedSandiwches: [],
      customerName: "",
      phoneNumber: "",
      totalPrice: 0
    });
  };

  handleNameInputChange(event) {
    this.setState({ customerName: event.target.value });
  }

  handlePhoneInputChange(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  render() {
    const sand = this.props.availableMenuItems.map((s, i) => (
      <SandwichInformation
        key={i}
        sandwich={s}
        inventory={this.props.inventory}
        addToCart={this.handleAddToCart}
      />
    ));
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} id="order-form">
          <div className="customer-information-wrapper">
            <div className="customer-information">
              <label htmlFor="namedInput" className="order-title">
                Customer name:
              </label>
              <input
                aria-label="Customer Name"
                id="namedInput"
                placeholder="Customer Name"
                type="text"
                className="customer-name"
                onChange={this.handleNameInputChange}
                required
              />
            </div>
            <div className="customer-information">
              <label htmlFor="phoneInput" className="order-title">
                Phone Number:
              </label>
              <input
                id="phoneInput"
                aria-label="Customer Phone Number"
                placeholder="Format: xxxxxxxxxx"
                maxLength={10}
                type="tel"
                name="phone"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                className="phone-number"
                onChange={this.handlePhoneInputChange}
                required
              />
            </div>
          </div>
          <span
            className="order-title"
            title="Menu Items"
            aria-labelledby="Menu Items"
          >
            Menu Items
          </span>
          {sand}
          <span
            className="order-title"
            title="Cart Items"
            aria-labelledby="Cart Items Title"
          >
            Cart Items
          </span>
          <CartInformation
            selectedSandiwches={this.state.selectedSandiwches}
            total={this.state.totalPrice}
            removeFromCart={this.handleRemoveFromCart}
          />
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }
}
