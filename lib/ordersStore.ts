// lib/ordersStore.ts

import fs from "fs";
import path from "path";

export type Order = {
  id: string; // simple string id
  createdAt: string; // ISO string
  customerEmail: string;
  customerName?: string;
  itemName: string;
  quantity: number;
  extraNotes?: string;
};

const DATA_FILE = path.join(process.cwd(), "orders.json");

function readOrdersFile(): Order[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    if (!raw.trim()) return [];
    return JSON.parse(raw) as Order[];
  } catch (e) {
    console.error("Failed to read orders.json", e);
    return [];
  }
}

function writeOrdersFile(orders: Order[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to write orders.json", e);
  }
}

export async function addOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
  const orders = readOrdersFile();

  // super simple ID – timestamp + count
  const newOrder: Order = {
    id: `${Date.now()}-${orders.length + 1}`,
    createdAt: new Date().toISOString(),
    ...order,
  };

  orders.push(newOrder);
  writeOrdersFile(orders);

  return newOrder;
}

export async function getAllOrders(): Promise<Order[]> {
  return readOrdersFile().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
