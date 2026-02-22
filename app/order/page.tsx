// app/order/page.tsx

import React from "react";

// Example static list of orders
// In a real app, you might fetch this from a database or API.
const ORDERS = [
  {
    id: "129391",
    customerName: "John Doe",
    status: "Shipped",
    total: "$79.99",
    items: [
      { name: "Wireless Headphones", quantity: 1 },
      { name: "USB-C Cable", quantity: 2 },
    ],
  },
  {
    id: "100001",
    customerName: "Jane Smith",
    status: "Processing",
    total: "$45.00",
    items: [
      { name: "Gaming Mousepad", quantity: 1 },
    ],
  },
];

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        <p className="mb-4 text-slate-300">
          This page is public. Anyone can view the list of orders, including the
          special order <span className="font-semibold">#129391</span>.
        </p>

        {/* Highlight the specific order 129391 */}
        <section className="mb-8 border border-emerald-500/60 rounded-lg p-4 bg-slate-900/60">
          <h2 className="text-xl font-semibold mb-3 text-emerald-400">
            Featured Order: #129391
          </h2>
          {ORDERS.filter((o) => o.id === "129391").map((order) => (
            <div key={order.id}>
              <p className="mb-1">
                <span className="font-medium">Customer:</span> {order.customerName}
              </p>
              <p className="mb-1">
                <span className="font-medium">Status:</span> {order.status}
              </p>
              <p className="mb-2">
                <span className="font-medium">Total:</span> {order.total}
              </p>
              <div>
                <h3 className="font-semibold mb-1">Items</h3>
                <ul className="list-disc list-inside text-sm text-slate-200">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* All orders list */}
        <section className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
          <h2 className="text-xl font-semibold mb-3">All Orders</h2>
          <div className="space-y-4">
            {ORDERS.map((order) => (
              <div
                key={order.id}
                className={`rounded-md border p-3 bg-slate-950/60 ${
                  order.id === "129391"
                    ? "border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    : "border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Order #{order.id}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-200">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm mb-1">
                  <span className="font-medium">Customer:</span> {order.customerName}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-medium">Total:</span> {order.total}
                </p>
                <details className="text-sm text-slate-300 cursor-pointer">
                  <summary className="mb-1 select-none">View items</summary>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
