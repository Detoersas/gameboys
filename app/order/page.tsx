// app/order/page.tsx

import { getAllOrders } from "@/lib/ordersStore";

export default async function OrderPage() {
  const orders = await getAllOrders();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        <p className="mb-4 text-slate-300">
          These are the orders that have been created using the form.
        </p>

        {orders.length === 0 ? (
          <p className="text-slate-400">No orders yet. Create one from the /order/new page.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-md border border-slate-700 bg-slate-900/60 p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-200">
                    {order.customerEmail}
                  </span>
                </div>

                <p className="text-sm mb-1">
                  <span className="font-medium">Customer name:</span>{" "}
                  {order.customerName || "(not provided)"}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Item:</span> {order.itemName}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Quantity:</span> {order.quantity}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Notes:</span>{" "}
                  {order.extraNotes || "(none)"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
