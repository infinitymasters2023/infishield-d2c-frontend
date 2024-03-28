// import React, { useState, useEffect, useMemo } from 'react';
// import Layout from '@/components/layouts/Layout';
// import PaytmChecksum from '@/helpers/paytm/PaytmChecksum';

// import Script from 'next/script';


// const dotenv = require('dotenv');
// dotenv.config();
// const https = require('https');

// interface PayTMRequestInterface {
//   token: string;
//   order: string;
//   mid: string;
// }
// interface PaytmConfig {
//   root: string;
//   data: {
//       orderId: string;
//       token: string;
//       tokenType: string;
//       amount: number;
//       mid: string;
//   };
//   payMode: {
//       labels: Record<string, any>;
//       filter: {
//           exclude: string[];
//       };
//       order: string[];
//   };
//   website: string;
//   flow: string;
//   merchant: {
//       mid: string;
//       redirect: boolean;
//   };
//   handler: {
//       transactionStatus: (paymentStatus: Record<string, any>) => void;
//       notifyMerchant: (eventName: string, data: Record<string, any>) => void;
//   };
// }
// function Index() {
//   const [loading, setLoading] = useState(false);
//   const [payTMData, setPayTM] = useState<PayTMRequestInterface>({
//     token: '',
//     order: '',
//     mid: 'InfinA73791511910258'
// });
// const initializePayment = useMemo(() => {
//   return async () => {
//       const orderId = 'Order_' + new Date().getTime();
//       sessionStorage.setItem('orderId', JSON.stringify(orderId));
//       const mid = 'InfinA73791511910258';
//       const mkey = 'Xv#3x9vZ%cawdcD1';
//       const paytmBody = {
//           requestType: 'Payment',
//           mid: mid,
//           websiteName: 'InfinAWEB',
//           orderId: orderId,
//           callbackUrl: `${process.env.APP_URL}/api/payment`,
//           txnAmount: {
            
//               value: 1.00,
//               currency: 'INR',
//           },
//           userInfo: {
//               custId: '250',
//           },
//       };

//       try {
//           const checksum = await PaytmChecksum.generateSignature(
//               JSON.stringify(paytmBody),
//               mkey
//           );
//           const paytmParams = {
//               body: paytmBody,
//               head: {
//                   signature: checksum,
//               }
//           };
//           const post_data = JSON.stringify(paytmParams);
//           const options = {
//               hostname: 'securegw.paytm.in',
//               port: 443,
//               path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Content-Length': post_data.length,
//               },
//           };

//           var response = "";
//           var post_req = https.request(options, function (post_res: any) {
//               post_res.on('data', function (chunk: any) {
//                   response += chunk;
//               });

//               post_res.on('end', function () {
//                   const responseBody = JSON.parse(response);
//                   if (responseBody.body && responseBody.body.txnToken) {
//                       const { txnToken } = responseBody.body;
//                       setPayTM({
//                           ...payTMData,
//                           token: txnToken,
//                           order: orderId,
//                           mid: mid,
//                       });
//                   }
//               });
//           });

//           post_req.write(post_data);
//           post_req.end();
//       } catch (error) {
//           console.error('Error:', error);
//       }
//   };
// }, []);
// useEffect(() => {
//     initializePayment();
// }, []);
// // InfinA73791511910258
// const makePaytmPayment = async () => {
//   const mid = 'InfinA73791511910258'; // Define mid here or get it from somewhere else

//   const config = {
//     root: '',
//     data: {
//       orderId: payTMData.order,
//       token: payTMData.token,
//       tokenType: 'TXN_TOKEN',
//       amount: 1.00,
//       mid: ''
//     },
//     payMode: {
//       labels: {},
//       filter: {
//         exclude: [],
//       },
//       order: ['CC', 'DC', 'NB', 'UPI', 'PPBL', 'PPI', 'BALANCE'],
//     },
//     website: 'WEBSTAGING',
//     flow: 'DEFAULT',
//     merchant: {
//       mid: mid,
//       redirect: true,
//     },
//     handler: {
//       transactionStatus: function (paymentStatus: any) {
//         // Handle transaction status
//         console.log('Transaction status:', paymentStatus);
//         // Add your implementation here to handle transaction status
//       },
//       notifyMerchant: function (eventName: any, data: any) {
//         // Handle payment notification event
//         console.log('Received payment notification:', eventName, data);
//         // Add your implementation here to handle payment notification event
//       }
//     }
//   };

//   if (typeof window !== 'undefined' && (window as any).Paytm && (window as any).Paytm.CheckoutJS) {
//     (window as any).Paytm.CheckoutJS.init(config)
//       .then(() => {
//         (window as any).Paytm.CheckoutJS.invoke();
//       })
//       .catch((error: any) => {
//         console.log('Error => ', error);
//       });
//   } else {
//     console.error('Paytm or CheckoutJS not available in the window object.');
//   }
// }




//   return (
//     <Layout>
//         <Script
//                 type="text/javascript"
//                 src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/InfinA73791511910258.js"
//                 strategy="beforeInteractive"
//                 crossOrigin="anonymous"
//             />
//       <div>
     
//           <button onClick={makePaytmPayment}>Pay Now</button>
    
//       </div>
//     </Layout>
//   );
// }

// export default Index;


// const initializePayment = useMemo(() => {
//     return async () => {
//         const orderId = 'Order_' + new Date().getTime();
//         sessionStorage.setItem('orderId', JSON.stringify(orderId));
//         const mid = 'InfinA73791511910258';
//         const mkey = 'Xv#3x9vZ%cawdcD1';
//         const paytmBody = {
//             requestType: 'Payment',
//             mid: mid,
//             websiteName: 'InfinAWEB',
//             orderId: orderId,
//             callbackUrl: 'http://localhost:3000/api/paytm',
//             txnAmount: {

//                 value: 1.00,
//                 currency: 'INR',
//             },
//             userInfo: {
//                 custId: '250',
//             },
//         };

//         try {
//             const checksum = await PaytmChecksum.generateSignature(
//                 JSON.stringify(paytmBody),
//                 mkey
//             );
//             const paytmParams = {
//                 body: paytmBody,
//                 head: {
//                     signature: checksum,
//                 }
//             };
//             const post_data = JSON.stringify(paytmParams);
//             const options = {
//                 hostname: 'securegw.paytm.in',
//                 port: 443,
//                 path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Content-Length': post_data.length,
//                 },
//             };

//             var response = "";
//             var post_req = https.request(options, function (post_res: any) {
//                 post_res.on('data', function (chunk: any) {
//                     response += chunk;
//                 });

//                 post_res.on('end', function () {
//                     const responseBody = JSON.parse(response);
//                     if (responseBody.body && responseBody.body.txnToken) {
//                         const { txnToken } = responseBody.body;
//                         setPayTM({
//                             ...payTMData,
//                             token: txnToken,
//                             order: orderId,
//                             mid: mid,
//                         });
//                     }
//                 });
//             });

//             post_req.write(post_data);
//             post_req.end();
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
// }, [totalSum]);
// useEffect(() => {
//     initializePayment();
// }, [totalSum]);
// // InfinA73791511910258
// const makePaytmPayment = async () => {
//     const mid = 'InfinA73791511910258'; // Define mid here or get it from somewhere else


//     const config = {
//         root: '',
//         data: {
//             orderId: payTMData.order,
//             token: payTMData.token,
//             tokenType: 'TXN_TOKEN',
//             amount: totalSum,
//             mid: ''
//         },
//         payMode: {
//             labels: {},
//             filter: {
//                 exclude: [],
//             },
//             order: ['CC', 'DC', 'NB', 'UPI', 'PPBL', 'PPI', 'BALANCE'],
//         },
//         website: 'WEBSTAGING',
//         flow: 'DEFAULT',
//         merchant: {
//             mid: mid,
//             redirect: true,
//         },
//         handler: {
//             transactionStatus: function (paymentStatus: any) {
//                 // Handle transaction status
//                 console.log('Transaction status:', paymentStatus);
//                 // Add your implementation here to handle transaction status
//             },
//             notifyMerchant: function (eventName: any, data: any) {
//                 // Handle payment notification event
//                 console.log('Received payment notification:', eventName, data);
//                 // Add your implementation here to handle payment notification event
//             }
//         }
//     };

//     if (typeof window !== 'undefined' && (window as any).Paytm && (window as any).Paytm.CheckoutJS) {
//         (window as any).Paytm.CheckoutJS.init(config)
//             .then(() => {
//                 (window as any).Paytm.CheckoutJS.invoke();
//             })
//             .catch((error: any) => {
//                 console.log('Error => ', error);
//             });
//     } else {
//         console.error('Paytm or CheckoutJS not available in the window object.');
//     }
// }


/*-------------------------*/

    