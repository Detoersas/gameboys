// app/order/page.tsx

import { supabaseServerClient } from "../../lib/supabaseServer"; // adjust if needed

// Helper to sanitize text by replacing banned words
function sanitizeText(input: string | null | undefined): string {
  if (!input) return "";

  // List of banned words (lowercase)
  const bannedWords = [
    "dexter",
    "dex",
    "omasta",
    // single-letter O as its own word
    "o",
  ];

  let result = input;

  for (const word of bannedWords) {
    if (word.length === 1) {
      // Handle single-letter words like "o" as whole words only
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      result = result.replace(regex, "***");
    } else {
      // Replace anywhere in the text
      const regex = new RegExp(word, "gi");
      result = result.replace(regex, "***");
    }
  }

  return result;
}

export default async function OrderPage() {
  const { data: orders, error } = await supabaseServerClient
    .from("orders")
    .select(
      "id, created_at, customer_email, customer_name, item_name, quantity, extra_notes"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error", error);
  }

  const safeOrders = orders || [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {safeOrders.length === 0 ? (
          <p className="text-slate-400">
            No orders yet. Create one from the /order/new page.
          </p>
        ) : (
          <div className="space-y-4">
            {safeOrders.map((order: any) => {
              // Random user number between 1 and 1000 for this order
              const randomUserNumber = Math.floor(Math.random() * 1000) + 1;

              const sanitizedItem = sanitizeText(order.item_name);
              const sanitizedNotes = sanitizeText(order.extra_notes);

              return (
                <div
                  key={order.id}
                  className="rounded-md border border-slate-700 bg-slate-900/60 p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    {/* Anonymized user label */}
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-200">
                      Anonymous
                    </span>
                  </div>

                  {/* Anonymized customer name */}
                  <p className="text-sm mb-1">
                    <span className="font-medium">Customer name:</span>{" "}
                    User {randomUserNumber}
                  </p>

                  <p className="text-sm mb-1">
                    <span className="font-medium">Item:</span> {sanitizedItem || "(hidden)"}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Quantity:</span> {order.quantity}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Notes:</span>{" "}
                    {sanitizedNotes || "(none)"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
