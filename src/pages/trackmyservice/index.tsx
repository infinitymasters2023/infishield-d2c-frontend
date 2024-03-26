import Layout from '@/components/layouts/Layout'
import { useState, useEffect } from 'react';
import iPhoneX from '../../assets/img/heroBanner/iPhone-X1.png' 
import Claim_Intimation from '../../assets/img/trackClaim/Claim_Intimation.svg'
import claim_tracking from '../../assets/img/trackClaim/claim_tracking.svg'
import file_svgrepocom  from '../../assets/img/trackClaim/file-svgrepo-com.svg'
import upload_doc from '../../assets/img/trackClaim/upload_doc.svg'
import Link from 'next/link'

function generateCaptcha() {
    return Math.floor(10000 + Math.random() * 90000);
}

function Index() {
    const [captcha, setCaptcha] = useState('');

    useEffect(() => {
        setCaptcha(generateCaptcha().toString());
    }, []); // Generate captcha only once on component mount

    const regenerateCaptcha = () => {
        setCaptcha(generateCaptcha().toString());
    };

    const [inputValue, setInputValue] = useState('');
    const [captchaMatch, setCaptchaMatch] = useState(true);

    const handleChange = (e:any) => {
        setInputValue(e.target.value);
        // Check if input value matches the captcha
        setCaptchaMatch(parseInt(e.target.value) === parseInt(captcha));
    };
  return (
    <Layout>

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
                                Track My Service
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
                                <h1 className="display-3">Track My Service</h1>
                                <p>Hassle Free Claim with InfyShield</p>
                                <p>
                                  • Intimate Claim &nbsp; • Upload documents &nbsp; • Track Claim Status
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


    <div className="trackClaim--Section">
      <div className="container">
        <div className="row justify-content-center">
          <div id="trackForm" className="trackClaim--body">
            <div className="trackClaim--left">
              <div className="trackClaim--Formcards">
                <h3>Please Enter Your Loan Details</h3>
                <small>
                  Start your claim journey by filling following details
                </small>
                <form action="">
                  <div className="row g-0 mb-3">
                    <div className="col-md-12">
                      <label htmlFor="inputPolicyNumber" className="form-label">
                        My Loan Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputPolicyNumber"
                        placeholder="My Loan Number"
                      />
                    </div>
                  </div>
                  <div className="row g-0 mb-4">
      <div className="col-md-12">
        <label htmlFor="inputPolicyNumber" className="form-label">
          Verify the captcha
        </label>
        <div className="input-group">
          <input
            type="tel"
            aria-label="uerLLine"
            className="form-control"
            placeholder="Captcha"
            value={inputValue}
            onChange={handleChange}
          />
          <span className="input-group-text captchaBtn">{captcha}</span>
          <span className="input-group-text">
            <button type="button" onClick={regenerateCaptcha}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                />
              </svg>{" "}
            </button>
          </span>
        </div>
        {!captchaMatch && <div className="text-danger">Captcha does not match!</div>}
      </div>
    </div>
                  <div className="row g-0 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="trackShield-btn btn-primary rounded-5 mb-3"
                    >
                      Track Now
                    </button>
                    <small className="smallTextInfo text-muted text-center w-75">
                      {" "}
                      <b>Note :</b>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </small>
                  </div>
                </form>
              </div>
            </div>
            <div className="trackClaim--right">
              <h3>Claim Journey</h3>
              <div className="trackClaim--content">
                <div className="track--step">
                  <div className="stepMedia">
                    <img
                      src={Claim_Intimation.src}
                      width={24}
                      height={24}
                      alt="Map Pin"
                    />
                  </div>
                  <div className="stepText w-75">
                    <h4>Initiate Claim</h4>
                    <p>Initiate your claim with few details</p>
                  </div>
                </div>
                <div className="track--step">
                  <div className="stepMedia">
                    <img
                      src={file_svgrepocom.src}
                      width={24}
                      height={24}
                      alt="Map Pin"
                    />
                  </div>
                  <div className="stepText">
                    <h4>Fill E-Claim Form</h4>
                    <p> Fill your E-Claim with few details instantly </p>
                  </div>
                </div>
                <div className="track--step">
                  <div className="stepMedia">
                    <img
                      src={upload_doc.src}
                      width={24}
                      height={24}
                      alt="Map Pin"
                    />
                  </div>
                  <div className="stepText">
                    <h4>Upload Documents</h4>
                    <p>Upload all documents in seconds </p>
                  </div>
                </div>
                <div className="track--step">
                  <div className="stepMedia">
                    <img
                      src={claim_tracking.src}
                      width={24}
                      height={24}
                      alt="Map Pin"
                    />
                  </div>
                  <div className="stepText">
                    <h4>Claim Tracking</h4>
                    <p> Track your claim status /Know your claim status </p>
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

export default Index