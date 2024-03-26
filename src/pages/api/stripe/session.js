import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const host = process.env.NEXT_PUBLIC_HOST;
const sessionId = Math.floor(Math.random() * 1000000) + Date.now();

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    try {
      const date = new Date().toISOString();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "INV-" + date,
              },
              unit_amount: body?.amount * 100 || 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        cancel_url: `${host}`,
        success_url: `${host}/success`,
      });

      console.log("Checkout Session Created:", sessionId); // Log session ID for debugging
      res.status(200).json({ sessionId: sessionId });
    } catch (err) {
      console.error("Error creating checkout session:", err.message); // Log detailed error message
      res.status(500).json({ error: "Error creating checkout session" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
