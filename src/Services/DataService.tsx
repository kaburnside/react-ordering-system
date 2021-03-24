import { Ingredients } from "../Shared/Interfaces/Ingredients.Interface";
import { Inventory } from "../Shared/Interfaces/Inventory.Interface";
import { Order } from "../Shared/Interfaces/Order.Interface";
import { Sandwich } from "../Shared/Interfaces/Sandwich.Interface";
let activeOrders: Array<Order> = [];
let inventory: Inventory;
let availableMenuItems: Sandwich;

/**
 * Returns the current inventory from the mock backend
 */
export const getInventory = () => {
  return inventory;
};

/**
 * When the user submits the order this method will add the order to the mock
 * backend active orders
 * @param order Order to be created
 */
export const setActiveOrder = (order: Order) => {
  // For now we will set the id to the current time in milliseconds as it will be the closest to random wihtout using a library to generate a UUID
  activeOrders.push(order);
  return activeOrders;
};

/**
 * Returns a list of current active orders
 */
export const getActiveOrders = () => {
  return activeOrders;
};

/**
 * Sets the order to picked up and returns a list of active orders
 * @param order the order that has been picked up
 */
export const setOrderToPickedUp = (order) => {
  let foundIndex = activeOrders.findIndex((x) => x.id === order.id);
  const updateOrder = activeOrders[foundIndex];
  updateOrder.pickedUp = true;
  activeOrders[foundIndex] = updateOrder;
  return getActiveOrders();
};

/**
 * Takes the order information and creates a new order to the mock backend
 * and returns an updated list of active orders
 * @param order The order to be created
 */
export const createOrder = (order: Order): Array<Order> => {
  if (
    order.customerName === "" ||
    order.orderItems.length === 0 ||
    order.phone.length !== 10
  ) {
    return null;
  }
  const newOrder: Order = {
    orderItems: order.orderItems,
    customerName: order.customerName,
    phone: order.phone,
    total: order.total,
    isActive: true,
    pickedUp: false,
    id: new Date().getUTCMilliseconds()
  };
  return setActiveOrder(newOrder);
  // This is where we would call the backend to make the appropriate call
};

/**
 * Removes the ingredients of a menu item from the inventory and returns the updated inventory
 * @param item Menu items ingredients to be removed from inventory
 */
export const subtractInventory = (item: Array<Ingredients>) => {
  const itemIngredients = item;
  const updatedInventory = inventory;
  for (let ingredient in itemIngredients) {
    const item = ingredient;
    if (itemIngredients[item] < 0) {
      throw new Error("Ingredients can not be less than 0: " + item);
    }
    updatedInventory[item] = updatedInventory[item] - itemIngredients[item];
  }
  inventory = updatedInventory;
  return getInventory();
};

/**
 * When a user removes an item from their cart the ingredients will be added
 * back into the inventory and will return the updated inventory
 * @param item Menu items ingredients to be added back into the inventory
 */
export const addToInventory = (item: Array<Ingredients>) => {
  const itemIngredients = item;
  const updatedInventory = inventory;
  for (let ingredient in itemIngredients) {
    const item = ingredient;
    if (itemIngredients[item] < 0) {
      throw new Error(
        "Ingredients can not be less than 0: " + itemIngredients[item]
      );
    }
    updatedInventory[item] = updatedInventory[item] + itemIngredients[item];
  }
  inventory = updatedInventory;
  return getInventory();
};
/**
 * Creates the mock inventory
 * @param inventoryObj Items received from App.js which are taken from the data.json
 */
export const initializeInventory = (inventoryObj: Inventory): Inventory => {
  inventory = inventoryObj;
  return inventory;
};

/**
 * Creates the mock menu items
 * @param items items from data.json
 */
export const initializeMenuItems = (items): Sandwich => {
  availableMenuItems = items;
  return availableMenuItems;
};
