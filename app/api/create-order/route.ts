// app/api/create-order/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    // WHERE THE EMAIL GOES
    const toAddress = "dexteromasta@yahoo.com"; // your inbox

    // WHO IT'S FROM (must be allowed by Resend)
    const fromAddress = "onboarding@resend.dev"; // or a verified sender in your Resend account

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

    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending order email", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
