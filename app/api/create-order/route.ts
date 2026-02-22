// app/api/create-order/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServerClient } from "@/lib/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerEmail,
      customerName,
      itemName,
      quantity,
      extraNotes,
    } = body;

    if (!customerEmail || !itemName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const toAddress = "dexteromasta@yahoo.com"; // where you receive orders
    const fromAddress = "onboarding@resend.dev"; // Resend sender

    const subject = `New order from ${customerEmail}`;

    const textContent = `A new order was placed.\n\nCustomer email: ${customerEmail}\nCustomer name: ${
      customerName || "(not provided)"
    }\n\nItem: ${itemName}\nQuantity: ${
      quantity || 1
    }\n\nNotes:\n${extraNotes || "(none)"}\n`;

    const htmlContent = `
      <h1>New Order</h1>
      <p><strong>Customer email:</strong> ${customerEmail}</p>
      <p><strong>Customer name:</strong> ${customerName || "(not provided)"}</p>
      <p><strong>Item:</strong> ${itemName}</p>
      <p><strong>Quantity:</strong> ${quantity || 1}</p>
      <p><strong>Notes:</strong> ${extraNotes || "(none)"}</p>
    `;

    // 1) Send email
    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject,
      text: textContent,
      html: htmlContent,
    });

    // 2) Save order in Supabase
    const { data, error } = await supabaseServerClient
      .from("orders")
      .insert({
        customer_email: customerEmail,
        customer_name: customerName || null,
        item_name: itemName,
        quantity: quantity || 1,
        extra_notes: extraNotes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error", error);
      return NextResponse.json(
        { error: "Failed to save order" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("Error handling create-order", error);
    return NextResponse.json(
      { error: "Failed to submit order" },
      { status: 500 }
    );
  }
}
