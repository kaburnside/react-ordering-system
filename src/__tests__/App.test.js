import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import {
  subtractInventory,
  addToInventory,
  createOrder
} from "../Services/DataService";

describe("App Renders", () => {
  it("basic app renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});

describe("Changing Inventory Counts", () => {
  it("Subtracting should not allow negative inputs", () => {
    const negIngredients = {
      bread: -2,
      lettuce: 2,
      tomato: 2,
      cheese: 2
    };
    expect(() => subtractInventory(negIngredients)).toThrow();
  });
  it("Subtracting should allow non-negative inputs", () => {
    const correctIngredients = {
      bread: 2,
      lettuce: 2,
      tomato: 2,
      cheese: 2
    };
    expect(() => subtractInventory(correctIngredients)).not.toThrow();
  });
  it("Adding should allow non-negative inputs", () => {
    const addIngredients = {
      bread: 2,
      lettuce: 2,
      tomato: 2,
      cheese: 2
    };
    expect(() => addToInventory(addIngredients)).not.toThrow();
  });
  it("Adding should not allow negative inputs", () => {
    const addIngredients = {
      bread: 2,
      lettuce: 2,
      tomato: -2,
      cheese: 2
    };
    expect(() => addToInventory(addIngredients)).toThrow();
  });
});

describe("Create Order", () => {
  it("It should create an order and return array of active orders", () => {
    const order = {
      orderItems: [
        {
          name: "Vegetarian",
          price: 8.99,
          ingredients: {
            bread: 2,
            lettuce: 2,
            tomato: 2,
            cheese: 2
          }
        }
      ],
      customerName: "Bob",
      phone: "4444444444",
      total: 8.99
    };
    expect(createOrder(order)).toContainEqual(
      expect.objectContaining({
        customerName: "Bob",
        isActive: true,
        id: expect.any(Number),
        orderItems: [
          {
            ingredients: { bread: 2, cheese: 2, lettuce: 2, tomato: 2 },
            name: "Vegetarian",
            price: 8.99
          }
        ],
        phone: "4444444444",
        pickedUp: false,
        total: 8.99
      })
    );
  });
  it("It should return null with blank customer name", () => {
    const brokenOrderName = {
      orderItems: [
        {
          name: "Vegetarian",
          price: 8.99,
          ingredients: {
            bread: 2,
            lettuce: 2,
            tomato: 2,
            cheese: 2
          }
        }
      ],
      customerName: "",
      phone: "5555555555",
      total: 8.99
    };
    expect(createOrder(brokenOrderName)).toBeNull();
  });
  it("It should return null with wrong phone number", () => {
    const brokenOrderPhone = {
      orderItems: [
        {
          name: "Vegetarian",
          price: 8.99,
          ingredients: {
            bread: 2,
            lettuce: 2,
            tomato: 2,
            cheese: 2
          }
        }
      ],
      customerName: "bob",
      phone: "1",
      total: 8.99
    };
    expect(createOrder(brokenOrderPhone)).toBeNull();
  });
});
