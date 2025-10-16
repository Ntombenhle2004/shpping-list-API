import { Item } from "../types/item";

let items: Item[] = [];
let currentId = 1;

export const getItems = (): Item[] => {
  return items;
};

export const getItemById = (id: number): Item | undefined => {
  const item = items.find((item) => item.id === id);
  return item;
};


export const addItem = (
  name: string,
  quantity: number,
  purchased: boolean
): Item => {
  const newItem: Item = {
    id: currentId++,
    name,
    quantity,
    purchased,
  };
  items.push(newItem);
  return newItem;
};


export const updateItem = (
  id: number,
  name?: string,
  quantity?: number,
  purchased?: boolean
): Item | undefined => {
  const item = getItemById(id);
  if (!item) return undefined;

  if (name !== undefined) item.name = name;
  if (quantity !== undefined) item.quantity = quantity;
  if (purchased !== undefined) item.purchased = purchased;

  return item;
};

export const deleteItem = (id: number): boolean => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
};
