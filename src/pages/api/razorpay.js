//razorpay.js
const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {
  const { taxAmt } = req.body;
  //console.log('taxAmt',taxAmt*100)
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = taxAmt;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      //console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}



// // pages/api/createOrder.js

// export default async function handler(req, res) {
//     // Generate orderId from Razorpay API
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'd8Ed6BiLrisb82xNJV4lCVxk',

//       },
//       body: JSON.stringify({
//         amount: 1000, // Amount in smallest currency unit. For example, 1000 is 10 INR if currency is INR
//         currency: 'INR',
//       }),
//     };
  
//     const response = await fetch('https://api.razorpay.com/v1/orders', options);
//     const data = await response.json();
  
//     res.status(200).json({ orderId: data.id });
//   }