// import Layout from '@/components/layouts/Layout'
// import React from 'react'
// import MakePaymentComponent from '../../components/MakePaymentComponent'
// function index() {
//   return (
//     <div>
//         <Layout>
//             <div>
//             <MakePaymentComponent/>

//             </div>
           
//         </Layout>

//     </div>
//   )
// }

// export default index



// // // Import Paytm SDK and other necessary modules
// // import PaytmChecksum from "@/helpers/paytm/PaytmChecksum";
// // import { useRouter } from "next/router";
// // import { useEffect } from "react";

// // // Your component

// // const dotenv = require('dotenv');
// // dotenv.config();
// // const https = require('https');
// // const PaytmPaymentPage = () => {
// //     const router = useRouter();

// //     const handlePaymentInitiation = async () => {
// //         // Function to generate checksum and initiate payment
// //         const orderId = 'Order_' + new Date().getTime();
// //         sessionStorage.setItem('orderId', JSON.stringify(orderId));
// //         const amount = 100; // Amount to be paid
// //         const mid = 'InfinA73791511910258';
// //         const mkey = 'Xv#3x9vZ%cawdcD1';

// //         // Prepare payment payload
// //         const paymentPayload = {
// //             requestType: 'Payment',
// //             mid: mid,
// //             websiteName: 'InfinAWEB',
// //             orderId: orderId,
// //                  callbackUrl: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=' + orderId,
// //             txnAmount: {
// //                 value: 1.00,
// //                 currency: 'INR',
// //             },
// //             userInfo: {
// //                 custId: '250',
// //             },
// //         };

// //         try {
// //             // Generate checksum
// //             const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paymentPayload), mkey);

// //             // Prepare Paytm transaction parameters
// //             const paytmParams = {
// //                 body: paymentPayload,
// //                 head: {
// //                     signature: checksum,
// //                 }
// //             };

// //             // Make API call to initiate transaction
// //             const response = await fetch('PAYTM_TRANSACTION_URL', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(paytmParams),
// //             });

// //             const responseData = await response.json();
            
// //             // Redirect user to Paytm payment page
// //             window.location.href = responseData.paymentUrl;
// //         } catch (error) {
// //             console.error('Error initiating payment:', error);
// //         }
// //     };

// //     // You can render a loading spinner or message while payment is being initiated
// //     return (
// //         <div>
// //             <button onClick={handlePaymentInitiation}>Initiate Payment</button>
// //         </div>
// //     );
// // };

// // export default PaytmPaymentPage;
