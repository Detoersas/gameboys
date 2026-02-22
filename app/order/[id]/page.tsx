// app/order/[id]/page.tsx

import React from "react";

const ORDERS = [
  {
    id: "129391",
    customerName: "Pierce H",
    status: "Completed",
    total: "$0.00",
    items: [
      { name: "website url", quantity: 1 },
      { name: "2 year warrenty", quantity: 1 },
    ],
  },
  {
    id: "100001",
    customerName: "Angelo",
    status: "Completed",
    total: "$0.00",
    items: [
      { name: "personal website", quantity: 1 },
    ],
  },
];

type Props = {
  params: { id: string };
};

export default function OrderDetailPage({ params }: Props) {
  const order = ORDERS.find((o) => o.id === params.id);

  if (!order) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p>Website url https://leogames.vercel.app/
          Contact me for more information at dextermo1025@beaufortschools.org.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Order #{order.id}</h1>
        <p className="mb-2">
          <span className="font-medium">Customer:</span> {order.customerName}
        </p>
        <p className="mb-2">
          <span className="font-medium">Status:</span> {order.status}
        </p>
        <p className="mb-2">
          <span className="font-medium">Total:</span> {order.total}
        </p>
      </div>
    </main>
  );
}
