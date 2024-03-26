// pages/api/paytm.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      // Parse and process Paytm response data
      const paytmResponse = req.body;
      
      // Verify the authenticity of the request (e.g., checksum validation)
  
      // Handle the payment status (success, failure, etc.)
      if (paytmResponse.STATUS === 'TXN_SUCCESS') {
        // Payment successful, handle accordingly
        console.log('Payment successful:', paytmResponse);
      } else {
        // Payment failed or pending, handle accordingly
        console.log('Payment failed:', paytmResponse);
      }
      
      // Send response to Paytm (mandatory)
      res.json({ status: 'Callback received' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  