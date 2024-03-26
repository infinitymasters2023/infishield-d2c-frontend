
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession, Session } from "next-iron-session";
import { parse, serialize } from 'cookie';

import { error } from 'console';
import { PaytmTransactionInterfaces } from '@/interfaces/common.interfaces';
declare module 'next' {
    interface NextApiRequest {
        session: Session;
    }
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const requestBody = JSON.parse(JSON.stringify(req.body));
        const paytmData: PaytmTransactionInterfaces = requestBody
        if (paytmData) {
            const iData = {
                STATUS: paytmData.STATUS,
                BANKTXNID: paytmData.BANKTXNID,
                TXNAMOUNT: paytmData.TXNAMOUNT,
                ORDERID: paytmData.ORDERID,
                PAYMENTMODE: paytmData.PAYMENTMODE,
                TXNDATE: paytmData.TXNDATE,
                TXNID: paytmData.TXNID,
              }
            // await onlineSalePaymentStatusUpdate({paymentOrderId : paytmData.ORDERID}).then((response) => {
            //     if (response && response.isSuccess && response.statusCode == 200) {
            //         const deletedCartCookie = serialize('cartinfo', '', {
            //             expires: new Date(0),
            //             path: '/',
            //         });
            //         const deletedCustomerCookie = serialize('customerinfo', '', {
            //             expires: new Date(0),
            //             path: '/',
            //         });
            //         res.setHeader('Set-Cookie', [deletedCartCookie, deletedCustomerCookie]);
            //     }
            // })
            // .catch((error) => {
            // })
            req.session.set("paytmData", iData);
            await req.session.save();
        }
        const pageUrl = '/payment';
        res.redirect(302, pageUrl);
    } catch (error) {
        console.error('Error parsing Paytm callback data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default withIronSession(handler, {
    password: "A3-7RZBTT-35QA27-46K44-S8BAE-3GJAQ-YTBLF",
    cookieName: "paytmData",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});
