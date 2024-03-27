import { LoginInterface } from "@/interfaces/AuthInterfaces";
import { get, post, put, del } from "./instance"

export const login = async (loginParams: LoginInterface): Promise<any> => {
    return await post('/loginwithotp', loginParams)
};

export const sendOtp = async (mobile: number): Promise<any> => {
    return await post('/send-email-txtmsg', {
        mobile,
        sentToOtp : 'Mobile'
    })
};
export const paymentsendOtp = async (mobile: number): Promise<any> => {
    return await post('/paymentconfirm-email-txtmsg', {
        mobile,
        sentToOtp : 'Mobile'
    })
};

