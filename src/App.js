import "./styles.css";
import React from "react";
import ActiveOrders from "./Components/ActiveOrders/ActiveOrders";
import OrderForm from "./Components/OrderForm/OrderForm";
import {
  getActiveOrders,
  initializeInventory,
  getInventory,
  initializeMenuItems,
  setOrderToPickedUp,
  createOrder
} from "./Services/DataService";
import Results from "./data.json";
/**
 * Instructions
 *
 * Use JavaScript (or TypeScript), React, and CSS to complete the following prompt.
 *
 * DO NOT use other libraries or packages. This includes state management (redux), styling, routing, etc.
 *   (Testing libraries are fine!!)
 * DO NOT use the codesandbox upload feature. Complete the entire exercise using codesandbox.
 *
 * Prompt
 *
 * You run a restaurant selling sandwiches and need some way of keeping track orders.
 * Create a React app that allows your employees to create new orders and show when they've been picked up.
 *
 * 1. Create a form where a user can create orders.
 * - A user should be able to see each sandwich and how much they cost.
 * - A user should be able to add sandwiches to the order using a button.
 * - A user should not be able to add a sandwich we don't have ingredients for (see data.json).
 * - A user should be able to see all items in an order.
 * - A user should be able to see the total cost of the order.
 * - A user should be able to complete the order using a button.
 *
 * 2. Create a component that display all active orders.
 * - A user should be able to see all "open" orders.
 * - A user should be able to uniquely identify orders from one another.
 * - A user should be able to see all items in an order.
 * - A user should be able to see the total cost of the order.
 * - A user should be able to mark the order as "picked-up" by clicking a button.
 * - A user should be able to clearly distinguish "open" and "picked-up" orders.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      inventory: {},
      availableMenuItems: {},
      customerName: "",
      phoneNumber: ""
    };
  }

  componentDidMount() {
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handlePhoneInputChange = this.handlePhoneInputChange.bind(this);
    initializeInventory(Results.inventory);
    const availableMenuItems = initializeMenuItems(Results.menu);
    const storedInventory = getInventory();
    this.setState({
      inventory: storedInventory,
      availableMenuItems: availableMenuItems
    });
  }
  /**
   * Sends the created order to the mock backend and returns an updated list of
   * active orders
   * @param {*} order
   */
  handleCreateOrder = (order) => {
    const returnedActiveOrders = createOrder(order);
    this.setState({ orders: returnedActiveOrders });
  };
  /**
   * Gets the current active orders from the mock backend
   */
  handleGetActiveOrders() {
    const orders = getActiveOrders();
    this.setState({ orders: orders });
  }

  handleNameInputChange(e) {
    const value = e.target.value;
    this.setState({ customerName: value });
  }

  handlePhoneInputChange(e) {
    this.setState({ phoneNumber: e.target.value });
  }
  /**
   * Handles completing the order when the order has been picked up
   * @param {*} e stringified json object of type Order
   */
  handleCompleteOrder = (e) => {
    e.preventDefault();
    const order = JSON.parse(e.target.value);
    const activeOrders = setOrderToPickedUp(order);
    this.setState({ orders: activeOrders });
    // update the backend with the changes and get updated available sandwiches
  };

  render() {
    const aOrders =
      this.state.orders.length > 0 ? (
        <ActiveOrders
          orders={this.state.orders}
          handleCompleteOrder={this.handleCompleteOrder}
        />
      ) : null;
    let menuLoaded =
      this.state.inventory && this.state.availableMenuItems.length > 0;

    const orderForm = menuLoaded ? (
      <OrderForm
        aria-label="Order Form Component"
        inventory={this.state.inventory}
        createOrder={this.handleCreateOrder}
        availableMenuItems={this.state.availableMenuItems}
        customerNameChange={this.handleNameInputChange}
        customerPhoneChange={this.handlePhoneInputChange}
        customerName={this.state.customerName}
        phoneNumber={this.state.phoneNumber}
      />
    ) : null;
    return (
      <div className="app-container">
        <div className="active-orders">
          <h1 title="Active Orders" aria-labelledby="Active Orders Title">
            Active Orders
          </h1>
          {aOrders}
        </div>
        <div className="seperator"></div>
        <div className="order-form">
          <h1 title="New Order" aria-labelledby="New Order Title">
            New Order
          </h1>
          {orderForm}
        </div>
      </div>
    );
  }
}
export default App;
