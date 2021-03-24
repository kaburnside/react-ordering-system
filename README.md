# Order Creation And Management Of Active Orders

A way to create and manage orders, manage inventory based orders being placed.

## Order Form

### Props

The order form accepts the follow properties

- `availableMenuItems` - Current menu items available
- `Inventory` - Current inventory based on input.

### Methods

- `createOrder(order: Order)` - Creates and exposes an order of type Order based on the inputs
- `customerNameChange(event: string)` - Returns the Customer Name user input.
- `customerPhoneChange(event: string)` - Returns the Customer Phone user input Format xxxxxxxxxx.

Simple implementation

```HTML
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
```

## Active Orders Component

The Active Orders accepts the follow properties

### Props

- `orders` - Array of current active orders

## Methods

- `handleCompleteOrder(event: any)` - Exposes the order to be set for pickup.

Simple implementation

```HTML
     <ActiveOrders
          orders={this.state.orders}
          handleCompleteOrder={this.handleCompleteOrder}
        />
```
