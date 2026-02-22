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

    const toAddress = process.env.EMAIL_TO || "dexteromasta@yahoo.com";
    const fromAddress = process.env.EMAIL_FROM || "onboarding@resend.dev";

    const subject = `New order from ${customerEmail}`;

    const textContent = `A new order was placed.

Customer email: ${customerEmail}
Customer name: ${customerName || "(not provided)"}

Item: ${itemName}
Quantity: ${quantity || 1}

Notes:
${extraNotes || "(none)"}
`;

    // Super simple HTML, no string tricks
    const htmlContent = `
      <h1>New Order</h1>
      <p><strong>Customer email:</strong> ${customerEmail}</p>
      <p><strong>Customer name:</strong> ${customerName || "(not provided)"}</p>
      <p><strong>Item:</strong> ${itemName}</p>
      <p><strong>Quantity:</strong> ${quantity || 1}</p>
      <p><strong>Notes:</strong> ${(extraNotes || "(none)")}</p>
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
