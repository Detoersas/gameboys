"use client";

import React, { useState } from "react";

export default function NewOrderPage() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [extraNotes, setExtraNotes] = useState("");

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          customerName,
          itemName,
          quantity,
          extraNotes,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      // Optionally reset some fields
      setItemName("");
      setQuantity(1);
      setExtraNotes("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit order");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Create an Order</h1>
        <p className="mb-4 text-slate-300">
          Fill out this form to place an order. You don&apos;t need to pay here – it
          just sends the details by email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-slate-800 bg-slate-900/60 rounded-lg p-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Your email (required)
            </label>
            <input
              id="email"
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Your name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="item">
              What are you ordering? (required)
            </label>
            <input
              id="item"
              type="text"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. website, logo, game, etc."
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="w-24 rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="notes">
              Extra details / notes (optional)
            </label>
            <textarea
              id="notes"
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              rows={4}
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Anything else you want to say about your order..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting..." : "Place order (no payment)"}
          </button>

          {status === "success" && (
            <p className="text-sm text-emerald-400 mt-2">
              Your order was submitted! The details were emailed successfully.
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-400 mt-2">
              {errorMessage || "There was a problem submitting your order."}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
