    // pages/api/paynow.js

import notify from "@/helpers/notify";
import { paymentsendOtp } from "@/services/login_services";

 
    export default async function paynow(req: { method: string; body: any; }, res: { redirect: (arg0: number, arg1: string) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; end: { (): void; new(): any; }; }; }) {
     
        if (req.method === "POST") {
            const transactionData = req.body;
        
            if (transactionData.STATUS === "TXN_SUCCESS") {
                // Assuming mobile number is included in the response data
                const mobileNumber = transactionData.mobileNumber; 
        
                // Redirect to success page
                res.redirect(303, `/success?transactionData=${JSON.stringify(transactionData)}`);
        
                if (mobileNumber && mobileNumber.length === 10) {
                    try {
                        // Send OTP using mobile number from response
                        const response = await paymentsendOtp(mobileNumber);
                        if (response && response.isSuccess && response.statusCode === 200) {
                            notify.success('OTP sent successfully!');
                        } else {
                            notify.error('Failed to send OTP. Please try again.');
                        }
                    } catch (error) {
                        console.error(error);
                        notify.error('Error sending OTP. Please try again.');
                    }
                } else {
                    console.error("Mobile number not found or invalid in the response.");
                }
            } else {
                // Return transaction data as JSON
                res.status(200).json(transactionData);
            }
        }
         else {
            res.status(405).end(); 
        }
    }
   