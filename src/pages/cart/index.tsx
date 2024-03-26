/* eslint-disable @next/next/no-before-interactive-script-outside-document */
/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layouts/Layout"
import mobileIcon from '../../assets/img/devices/mobileIcon.png'
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import { CartItem } from "@/interfaces/common.interfaces";
import DeviceCategoryModal from "@/components/products/DeviceCategoryModal";
import PaytmChecksum from "@/helpers/paytm/PaytmChecksum";
import Script from "next/script";
import logo from '../../assets/img/logo/logo1.png'
import paytm from '../../assets/img/payment/paytm.svg'
import razorpay from '../../assets/img/payment/razorpay-icon.svg'
declare global {
    interface Window {
        Razorpay: any;
    }
}
const dotenv = require('dotenv');
dotenv.config();
const https = require('https');

interface PayTMRequestInterface {
    token: string;
    order: string;
    mid: string;
}
interface PaytmConfig {
    root: string;
    data: {
        orderId: string;
        token: string;
        tokenType: string;
        amount: number;
        mid: string;
    };
    payMode: {
        labels: Record<string, any>;
        filter: {
            exclude: string[];
        };
        order: string[];
    };
    website: string;
    flow: string;
    merchant: {
        mid: string;
        redirect: boolean;
    };
    handler: {
        transactionStatus: (paymentStatus: Record<string, any>) => void;
        notifyMerchant: (eventName: string, data: Record<string, any>) => void;
    };
}
const CartPage: React.FC = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subcategoryid, setSubcategoryId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPaymentButtons, setShowPaymentButtons] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isManufacturerWarrantyAccepted, setIsManufacturerWarrantyAccepted] = useState(false);
    const [payTMData, setPayTM] = useState<PayTMRequestInterface>({
        token: '',
        order: '',
        mid: 'InfinA73791511910258'
    });

    useEffect(() => {

        const getCartItemsFromSessionStorage = () => {
            const invoiceAmount = sessionStorage.getItem("invoiceamount");
            const invoiceDate = sessionStorage.getItem("invoicedate");
            const plan = sessionStorage.getItem("plan");
            const price = sessionStorage.getItem("price");
            const brand = sessionStorage.getItem("brand");
            const subcategoryid = sessionStorage.getItem("subcategoryid");

            if (invoiceAmount && invoiceDate && plan && price && brand && subcategoryid) {

                const cartItem = {
                    productName: plan,
                    devicePrice: price,
                    planDuration: invoiceDate,
                    totalAmount: invoiceAmount,
                    brand: brand,
                    subcategoryid: subcategoryid
                };

                setSubcategoryId(subcategoryid);
                const cartItems = Cookies.get('cartitems');
                if (cartItems) {
                    const parsedCartItems = JSON.parse(cartItems);
                    setCartItems(parsedCartItems);
                }
            }
        };

        getCartItemsFromSessionStorage();


    }, []);
    const handleTermsCheckboxChange = () => {
        setIsTermsAccepted(!isTermsAccepted);
    };

    const handleManufacturerWarrantyCheckboxChange = () => {
        setIsManufacturerWarrantyAccepted(!isManufacturerWarrantyAccepted);
    };


    const totalSum = cartItems.reduce((accumulator, item) => {
        const devicePrice = parseFloat(item.Price);
        return isNaN(devicePrice) ? accumulator : accumulator + devicePrice;
        sessionStorage.setItem("totalSum", totalSum.toString());
    }, 0);
    const handleRemoveItem = (indexToRemove: number) => {
        const updatedCartItems = cartItems.filter((item, index) => index !== indexToRemove);
        setCartItems(updatedCartItems);
        Cookies.set('cartitems', JSON.stringify(updatedCartItems));

    };

    const initializePayment = useMemo(() => {
        return async () => {
            const orderId = 'Order_' + new Date().getTime();
            sessionStorage.setItem('orderId', JSON.stringify(orderId));
            const mid = 'InfinA73791511910258';
            const mkey = 'Xv#3x9vZ%cawdcD1';
            const paytmBody = {
                requestType: 'Payment',
                mid: mid,
                websiteName: 'InfinAWEB',
                orderId: orderId,
                callbackUrl: `${process.env.APP_URL}/api/payment`,
                txnAmount: {

                    value: totalSum,
                    currency: 'INR',
                },
                userInfo: {
                    custId: '250',
                },
            };

            try {
                const checksum = await PaytmChecksum.generateSignature(
                    JSON.stringify(paytmBody),
                    mkey
                );
                const paytmParams = {
                    body: paytmBody,
                    head: {
                        signature: checksum,
                    }
                };
                const post_data = JSON.stringify(paytmParams);
                const options = {
                    hostname: 'securegw.paytm.in',
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length,
                    },
                };

                var response = "";
                var post_req = https.request(options, function (post_res: any) {
                    post_res.on('data', function (chunk: any) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        const responseBody = JSON.parse(response);
                        if (responseBody.body && responseBody.body.txnToken) {
                            const { txnToken } = responseBody.body;
                            setPayTM({
                                ...payTMData,
                                token: txnToken,
                                order: orderId,
                                mid: mid,
                            });
                        }
                    });
                });

                post_req.write(post_data);
                post_req.end();
            } catch (error) {
                console.error('Error:', error);
            }
        };
    }, []);
    useEffect(() => {
        initializePayment();
    }, []);
    // InfinA73791511910258
    const makePaytmPayment = async () => {
        const mid = 'InfinA73791511910258'; // Define mid here or get it from somewhere else


        const config = {
            root: '',
            data: {
                orderId: payTMData.order,
                token: payTMData.token,
                tokenType: 'TXN_TOKEN',
                amount: totalSum,
                mid: ''
            },
            payMode: {
                labels: {},
                filter: {
                    exclude: [],
                },
                order: ['CC', 'DC', 'NB', 'UPI', 'PPBL', 'PPI', 'BALANCE'],
            },
            website: 'WEBSTAGING',
            flow: 'DEFAULT',
            merchant: {
                mid: mid,
                redirect: true,
            },
            handler: {
                transactionStatus: function (paymentStatus: any) {
                    // Handle transaction status
                    console.log('Transaction status:', paymentStatus);
                    // Add your implementation here to handle transaction status
                },
                notifyMerchant: function (eventName: any, data: any) {
                    // Handle payment notification event
                    console.log('Received payment notification:', eventName, data);
                    // Add your implementation here to handle payment notification event
                }
            }
        };

        if (typeof window !== 'undefined' && (window as any).Paytm && (window as any).Paytm.CheckoutJS) {
            (window as any).Paytm.CheckoutJS.init(config)
                .then(() => {
                    (window as any).Paytm.CheckoutJS.invoke();
                })
                .catch((error: any) => {
                    console.log('Error => ', error);
                });
        } else {
            console.error('Paytm or CheckoutJS not available in the window object.');
        }
    }

    /*razorpay*/

    const makePayment = async () => {
        const initializeRazorpay = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => { resolve(true); };
                script.onerror = () => { resolve(false); };
                document.body.appendChild(script);
            });
        };

        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        const data = await fetch("/api/razorpay", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                taxAmt: totalSum
            })
        }).then((t) => t.json());
        var options = {
            key: process.env.RAZORPAY_KEY,
            name: "infinityassurance",
            currency: data.currency,
            amount: data.totalSum,
            order_id: data.id,
            description: "Thank you for your purchase",
            image: logo.src,
            handler: function (response: { razorpay_payment_id: string; }) {
                alert("Razorpay Response: " + response.razorpay_payment_id);
            },
            prefill: {
                name: "yash gaur",
                email: "yash070711@gmail.com",
                contact: '9582293150'
            }
        };


        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };



    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleProceedToPayment = () => {
        if (isTermsAccepted && isManufacturerWarrantyAccepted) {
            setShowPaymentButtons(true);
        }
    };
    return (
        <Layout>
            <Script
                type="text/javascript"
                src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/InfinA73791511910258.js"
                strategy="beforeInteractive"
                crossOrigin="anonymous"
            />

            <section className="pageMainContent">
                <div className="container g-0">
                    <div className="row g-0">
                        <div className="pageHead-Outer">
                            <div className="outerHero">
                                <div className="row g-0">
                                    {/* Breadcrumb start */}
                                    <nav aria-label="breadcrumb" className="g-0">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                My Cart
                                            </li>
                                        </ol>
                                    </nav>
                                    {/* Breadcrumb ends */}
                                    {/* banner start */}
                                    <div className="OuterBanner">
                                        {/* left */}
                                        <div className="OuterBanner--left">
                                            <div className="left_content">
                                                <h2>InfyShield</h2>
                                                <h1 className="display-3">Your Cart</h1>
                                                <p>
                                                    A complete mobile protection plan covering
                                                    additional warranty, damage protection and assured
                                                    buyback
                                                </p>
                                            </div>
                                            <div className="left_action d-none">
                                                <a href="#dwFormBox" className="ActionBtn">
                                                    {" "}
                                                    Get Now
                                                </a>
                                            </div>
                                        </div>
                                        {/* right */}
                                        <div className="OuterBanner--right d-none">
                                            <figure className="figure">
                                                <img
                                                    src="assets/img/heroBanner/iPhone-X 1.png"
                                                    className="figure-img img-fluid"
                                                    width={200}
                                                    height={398}
                                                    alt="banner right"
                                                />
                                            </figure>
                                        </div>
                                    </div>
                                    {/* banner ends */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="myCart">
                <div className="container">
                    <div className="row">
                        <div className="myCart--body">
                            <div className="myCart--left">
                                <div className="myCart-header">
                                    <ul>
                                        <li>Product Name</li>
                                        <li>Device Price</li>
                                        <li>Plan Duration</li>
                                        <li>Total Amount</li>
                                    </ul>
                                </div>
                                <hr />
                                {cartItems.length === 0 ? (
                                    <p>Your cart is empty</p>
                                ) : (
                                    cartItems.map((item, index) => (
                                        <div className="myCart--item" key={index}>
                                            <button type="button" className="btn-close" aria-label="Close" onClick={() => handleRemoveItem(index)} />
                                            <div className="itemTop">
                                                <div className="itemHead">
                                                    <div className="media">
                                                        <img src={mobileIcon.src} width={64} height={64} alt="device type image" />
                                                    </div>
                                                    <div className="itemName">
                                                        <h3>{item.Plan}</h3>
                                                        <p>{item.brand}</p>
                                                    </div>
                                                </div>
                                                <div className="itemDetail">
                                                    <div className="itemPrice">
                                                        <span>Device Price</span>
                                                        <span>₹ {item.invoiceamount}</span>
                                                    </div>
                                                    <div className="itemTime">
                                                        <span>Plan Duration</span>
                                                        <span>{item.Plan.substring(0, 7)}</span>
                                                    </div>
                                                    <div className="itemAmount">
                                                        <span>Total Amount</span>
                                                        <span>₹ {item.Price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="itembottom">
                                                <form action="">
                                                    <div className="input-group mt-1">
                                                        <input type="text" className="form-control" placeholder={subcategoryid === '2' ? "Enter IMEI Number" : "Enter Invoice Number"} aria-label="Enter IMEI Number" aria-describedby="button-addon2" />
                                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Verify</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    ))
                                )}

                                <div className="myCart-footer">
                                    <button className="addDevices" type="button"
                                        onClick={() => {
                                            handleShowModal()
                                        }}>
                                        {" "}
                                        Add More Devices

                                    </button>
                                    <DeviceCategoryModal
                                        showModal={showModal}
                                        toggleModal={handleCloseModal}

                                    />
                                    <div className="promoInput">
                                        <form action="">
                                            <div className="input-group mt-1">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Have Promo Code?"
                                                    aria-label="Enter IMEI Number"
                                                    aria-describedby="button-addon2"
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    id="button-addon2"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="myCart--right">
                                <div className="summary--Header">
                                    <h3>Your Cart Summary</h3>
                                </div>
                                <div className="summary--body">
                                    <ul className="itemList">
                                        <li>
                                            <span className="textName">Total Iteams</span>{" "}
                                            <span className="textCount">{cartItems.length}</span>
                                        </li>
                                        <li>
                                            <span className="textName">Total Cost</span>{" "}
                                            <span className="textCount">₹{totalSum.toFixed(2)}</span>
                                        </li>
                                        <li>
                                            <span className="textName">Other Charges</span>{" "}
                                            <span className="textCount">0</span>
                                        </li>
                                    </ul>
                                    <div className="termsbox">
                                        <form action="">
                                            <div className="form-check">
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="termsCondition1"
                                                >
                                                    Device Manufacturer Warranty should be 1 year or more
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="termsCondition1"

                                                    checked={isManufacturerWarrantyAccepted}
                                                    onChange={handleManufacturerWarrantyCheckboxChange}
                                                />
                                            </div>
                                            <div className="form-check">
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="termsCondition2"
                                                >
                                                    By proceeding, you agree to the <b>Term and Condition</b>{" "}
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="termsCondition2"

                                                    checked={isTermsAccepted}
                                                    onChange={handleTermsCheckboxChange}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="summary--Footer">
                                    {!showPaymentButtons && (
                                        <button
                                            className="ptpBtn"
                                            type="button"
                                            disabled={!isTermsAccepted || !isManufacturerWarrantyAccepted}
                                            onClick={handleProceedToPayment}
                                        >
                                            Proceed to payment
                                        </button>
                                    )}

                                    {showPaymentButtons && (
                                        <>
                                            <button
                                                className=""
                                                type="button"
                                                onClick={makePayment}
                                            >
                                                  <img src={razorpay.src}
                                            width={50}
                                            height={30}
                                            alt="Proceed to payment" />
                                    
                                            </button>

                                            <button
                                                className="float-end"
                                                type="button"
                                                onClick={makePaytmPayment}
                                            >
                                                  <img src={paytm.src}
                                                width={100}
                                                height={30}
                                                alt=" Pay with Paytm" />
                                                
                                            </button>
                                        </>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*-------------address-------------------------------*/}
            <div className="cartAddress">
                <div className="container">
                    <div className="row">
                        <div className="addCard">
                            <div className="accordion" id="accordionAddress">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Your Address{" "}
                                            <i className="fa fa-address-book" aria-hidden="true" />
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionAddress"
                                    >
                                        <div className="accordion-body">
                                            <div className="row g-0">
                                                <div id="cartAddFormBox" className="cartAdd--form">
                                                    <form action="">
                                                        <div className="row g-0 mb-0">
                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="Select Device"
                                                                    className="form-label"
                                                                >
                                                                    Salutation <span className="text-danger"> *</span>{" "}
                                                                </label>
                                                                <select
                                                                    id="inputDevice"
                                                                    className="form-select form-select-lg"

                                                                >
                                                                    <option >Select Salutation...</option>
                                                                    <option>Mr.</option>
                                                                    <option>Ms.</option>
                                                                    <option>Mrs.</option>
                                                                    <option>Dr.</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="customerName"
                                                                    className="form-label"
                                                                >
                                                                    Customer Name{" "}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="customerName"
                                                                    placeholder="Enter Your full name"

                                                                />
                                                                <small className="ms-2">
                                                                    please enter name same as in your{" "}
                                                                    <b className="text-info">AADHAAR CARD/PAN</b>{" "}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="row g-0 mb-1">
                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="inputAddressLine1"
                                                                    className="form-label"
                                                                >
                                                                    Address Line 1{" "}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="inputAddressLine1"
                                                                    placeholder="Address line 1"

                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="inputAddressLine2"
                                                                    className="form-label"
                                                                >
                                                                    Address Line 2{" "}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="inputAddressLine2"
                                                                    placeholder="Address line 2"

                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="inputAddressLine3"
                                                                    className="form-label"
                                                                >
                                                                    Address Line 3{" "}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="inputAddressLine3"
                                                                    placeholder="Address line 3"

                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="pinCode" className="form-label">
                                                                    Pin Code <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="pinCode"
                                                                    placeholder="Enter Pin Code"

                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="inputCity" className="form-label">
                                                                    City <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="inputCity"
                                                                    placeholder="Enter City"

                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="inputState" className="form-label">
                                                                    State <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="inputState"
                                                                    placeholder="Enter State"

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row g-0 mb-4">
                                                            <div className="col-md-6">
                                                                <label htmlFor="userEmail" className="form-label">
                                                                    Email <span className="text-danger"> *</span>
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="userEmail"
                                                                    placeholder="Enter Email"

                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="uerMobile" className="form-label">
                                                                    Mobile Number{" "}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <div className="input-group">
                                                                    <span
                                                                        className="input-group-text"
                                                                        id="basic-addon1"
                                                                    >
                                                                        +91
                                                                    </span>
                                                                    <input
                                                                        type="tel"
                                                                        className="form-control"
                                                                        id="uerMobile"
                                                                        placeholder="Enter Mobile No."
                                                                        aria-label="Username"
                                                                        aria-describedby="basic-addon1"

                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="uerLLine" className="form-label">
                                                                    Landline Number{" "}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">+91</span>
                                                                    <input
                                                                        type="tel"
                                                                        aria-label="uerLLine"
                                                                        className="form-control"
                                                                        placeholder="XXX"
                                                                    />
                                                                    <input
                                                                        type="tel"
                                                                        aria-label="uerLLine"
                                                                        className="form-control"
                                                                        placeholder="XXXXX"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row g-0 d-flex flex-column align-items-center justify-content-center">
                                                            <button
                                                                type="submit"
                                                                className="setAdd-btn btn-primary rounded-5 mb-3"
                                                            >
                                                                Add Address
                                                            </button>
                                                            <small className="smallTextInfo text-muted text-center w-75">
                                                                {" "}
                                                                <b>Note :</b>
                                                                All field with <b>*</b> are mandatory to be filled{" "}
                                                            </small>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default CartPage;