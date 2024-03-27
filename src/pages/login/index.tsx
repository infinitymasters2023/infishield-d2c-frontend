import InputTextField from "@/components/input-fields/InputTextField";
import OtpInputField from "@/components/input-fields/OtpInputField";
import Layout from "@/components/layouts/Layout";
import notify from "@/helpers/notify";
import { allowOnlyMobileNumber } from "@/helpers/uitility";
import { LoginInterface } from "@/interfaces/AuthInterfaces";
import { login, sendOtp } from "@/services/login_services";
import { multyFactorValidationSchema } from "@/validations/login/multifactor_validation";
import { getIn, useFormik } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";

const LoginPage: React.FC = () => {

    const MobileRef = useRef<HTMLInputElement | null>(null);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const router = useRouter();
    const[branch,setbranch]=useState('')
    const onOtpComplete = async (otp: string) => {
        console.log(otp);
        formik.setFieldValue('otp', otp);
    }

 // const handleSendOtp = async () => {
    //     if (formik.values.mobile && formik.values.mobile.length === 10) { // Check if mobile number is exactly 10 digits
    //         try {
    //             const response = await sendOtp(formik.values.mobile);
    //             if (response && response.isSuccess && response.statusCode === 200) {
    //                 notify.success('OTP sent successfully!');
    //                 setShowOtpField(true); // Show OTP field upon successful OTP send
    //             } else {
    //                 notify.error('Failed to send OTP. Please try again.');
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             notify.error('Error sending OTP. Please try again.');
    //         }
    //     } else {
    //         notify.error('Please enter a valid 10-digit mobile number before sending OTP.');
    //     }
    // };
    

    const handleSendOtp = async () => {
        const mobileNumber = formik.values.mobile ?? "";
       
        if (mobileNumber && mobileNumber.toString().length === 10) {
            try {
                const response = await sendOtp(mobileNumber); 
                if (response && response.isSuccess && response.statusCode === 200) {
                    notify.success('OTP sent successfully!');
                    setShowOtpField(true); // Show OTP field upon successful OTP send
                } else {
                    notify.error('Failed to send OTP. Please try again.');
                }
            } catch (error) {
                console.error(error);
                notify.error('Error sending OTP. Please try again.');
            }
        } else {
            notify.error('Please enter a valid 10-digit mobile number before sending OTP.');
        }
    };
    
    
    
    
    

    // const handleSendOtp = async () => {
    //     const mobileNumber = formik.values.mobile?.toString(); // Convert mobile number to string
    //     if (mobileNumber && mobileNumber.length === 10) { // Check if mobile number is not null and is exactly 10 digits
    //         try {
    //             const response = await sendOtp(mobileNumber); // Pass mobileNumber as a string
    //             if (response && response.isSuccess && response.statusCode === 200) {
    //                 notify.success('OTP sent successfully!');
    //                 setShowOtpField(true); // Show OTP field upon successful OTP send
    //             } else {
    //                 notify.error('Failed to send OTP. Please try again.');
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             notify.error('Error sending OTP. Please try again.');
    //         }
    //     } else {
    //         notify.error('Please enter a valid 10-digit mobile number before sending OTP.');
    //     }
    // };
    
    const handleSubmit = async () => {
        const otp = formik.values.otp?.toString(); // Convert otp to string
        if (formik.isValid && otp && otp.length === 6) {
            try {
                const response = await login(formik.values);
              
                if (response && response.isSuccess && response.statusCode === 200) {
   
                    
                    // Check if response has branchname and clientid properties
                    if (response.data && response.data.branchname && response.data.contactpersonname) {
                        // Set branchname and clientid in sessionStorage
                        sessionStorage.setItem('branchname', response.data.branchname);
                        sessionStorage.setItem('clientid', response.data.contactpersonname);
                  
                    } else {
                        console.error('Branchname or clientid is undefined in the response');
                    }
                    router.push('/');

                    // Display notification toaster message with the branch name
                    notify.success(`Welcome, ${response.data.branchname}!`);
                } else {
                    notify.error('Incorrect OTP. Please try again.');
                }
            } catch (error) {
                console.error(error);
                notify.error('Error submitting form. Please try again.');
            }
        } else {
            notify.error('Please enter a valid OTP.');
        }
    };
    
    
    
    
    

    const handleResendOtp = async () => {
        // Clear the previous OTP value
        setOtpValue('');

        if (formik.values.mobile) {
            try {
                const response = await sendOtp(formik.values.mobile);
                if (response && response.isSuccess && response.statusCode === 200) {
                    notify.success('OTP resent successfully!');
                } else {
                    notify.error('Failed to resend OTP. Please try again.');
                }
            } catch (error) {
                console.error(error);
                notify.error('Error resending OTP. Please try again.');
            }
        } else {
            notify.error('Please enter a mobile number before resending OTP.');
        }
    };

    const formik = useFormik<LoginInterface>({
        initialValues: {
            mobile: null,
            otp: null
        },
        validationSchema: multyFactorValidationSchema,
        onSubmit: handleSubmit,
    });

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        var transformValue = ''
        switch (name) {
            case 'mobile':
                transformValue = await allowOnlyMobileNumber(value)
                formik.setFieldValue(name, transformValue)
                break;
            default:
                transformValue = await allowOnlyMobileNumber(value)
                formik.setFieldValue(name, transformValue)
                break;
        }
    }

    const handleLoginClick = async () => {
 handleSubmit();
    }

    return (
        <Layout>
            <div className="loginSection bubleBg">
                <div className="container">
                    <div className="row">
                        <div className="login--body">
                            <div className="headerTop">
                                <h2>Customer Login</h2>
                                <p>welcome to InfyShield</p>
                            </div>
                            <div className="login--form">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row g-0 mb-3">
                                        <div className="col-12">
                                            <InputTextField key={`Mobile Number`}
                                                fieldName={`mobile`}
                                                type={'number'}
                                                value={formik.values.mobile}
                                                maxLength={10}
                                                minLength={10}
                                                placeholder="Enter Mobile Number"
                                                isDisabled={false}
                                                isReadOnly={false}
                                                handleOnChange={handleInputChange}
                                                inputFieldRef={MobileRef}
                                                labelName={`Mobile Number`}
                                                isRequired={true} />
                                            {getIn(formik.touched, `mobile`) && getIn(formik.errors, `mobile`) && <div className="form-validated">{getIn(formik.errors, `mobile`)}</div>}
                                        </div>
                                    </div>
                                    {formik.values.mobile && formik.values.mobile.toString().length === 10 && !showOtpField && (
    <div className="row justify-content-center g-0 mb-3">
        <Button className="loginAuth-btn btn-outline-primary rounded-5 mb-3" type="button" onClick={handleSendOtp}>Send OTP</Button>
    </div>
)}
                                    {
                                        showOtpField && (
                                            <div className="row d-flex justify-content-center g-0 mb-3">
                                                <div className="col-12">
                                                    <span className="otp">Enter OTP below</span>
                                                    <div className="otp-input-fields">
                                                        <OtpInputField onComplete={(otp) => onOtpComplete(otp)} setOtpValue={setOtpValue} />
                                                    </div>
                                                    <div className="resendOtp cursor-pointer" onClick={handleResendOtp}>
                                                        Resend OTP
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="row justify-content-center g-0 mb-3">
                                        <p>
                                            By proceeding, you agree to the{" "}
                                            <a href="#" className="paraLink">
                                                {" "}
                                                Terms of Service
                                            </a>{" "}
                                        </p>
                                        <Button className="loginAuth-btn btn-outline-primary rounded-5 mb-3" type="submit" onClick={handleLoginClick}>Login</Button>
                                    </div>

                                    <div className="row g-0">
                                        <p>
                                            For New User{" "}
                                            <a href="#" className="paraLink">
                                                {" "}
                                                SignUp
                                            </a>{" "}
                                        </p>
                                        <p>
                                            Login as InfyShield{" "}
                                            <a href="#" className="paraLink">
                                                {" "}
                                            </a>{" "}
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LoginPage;
