import { Sandwich } from "./Sandwich.Interface";

export interface Order {
  id?: number;
  customerName: string;
  phone: string;
  total: number;
  isActive?: boolean;
  pickedUp?: boolean;
  orderItems: Array<Sandwich>;
}
