import { Ingredients } from "./Ingredients.Interface";
export interface Sandwich {
  name: string;
  price: number;
  ingredients: Ingredients[];
}
