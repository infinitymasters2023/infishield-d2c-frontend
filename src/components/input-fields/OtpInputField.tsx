import React, { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent, Dispatch, SetStateAction } from 'react';

interface OTPInputProps {
    length?: number;
    onComplete: (otp: string) => void;
    setOtpValue: Dispatch<SetStateAction<string>>
}

const OtpInputField: React.FC<OTPInputProps> = ({ length = 6, onComplete, setOtpValue }) => {
    const [otp, setOTP] = useState<string[]>(new Array(length).fill(''));
    const inputsRef = useRef<Array<HTMLInputElement | null>>(new Array(length).fill(null));

    const handleChange = (index: number, value: string) => {
        const newOTP = [...otp];
        if (!isNaN(parseInt(value)) && value !== '') {
            newOTP[index] = value;
            setOTP(newOTP);
        } else {
            newOTP[index] = '';
            setOTP(newOTP);
        }

        if (index === length - 1 && newOTP.every((digit) => digit !== '')) {
            onComplete(newOTP.join(''));
        } else if (value !== '' && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        setOtpValue(newOTP.join(''))
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData?.getData('text/plain') || '';
        const newOTP = pasteData
            .slice(0, length)
            .split('')
            .map((char) => (isNaN(parseInt(char, 10)) ? '' : char));
        setOTP(newOTP);
    };

    return (
        <div>
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    required={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    onPaste={(e: ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
                    ref={(input) => {
                        inputsRef.current[index] = input;
                    }}
                    style={{ width: '2em', marginRight: '0.5em' }}
                />
            ))}
        </div>
    );
};

export default OtpInputField;



















// import React, { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent, Dispatch, SetStateAction } from 'react';

// interface OTPInputProps {
//     length?: number;
//     onComplete: (otp: string) => void;
//     setOtpValue: Dispatch<SetStateAction<string>>
// }

// const OtpInputField: React.FC<OTPInputProps> = ({ length = 6, onComplete, setOtpValue }) => {
//     const [otp, setOTP] = useState<string[]>(new Array(length).fill(''));
//     const inputsRef = useRef<Array<HTMLInputElement | null>>(new Array(length).fill(null));

//     const handleChange = (index: number, value: string) => {
//         const newOTP = [...otp];
//         if (!isNaN(parseInt(value)) && value !== '') {
//             newOTP[index] = value;
//             setOTP(newOTP);
//         } else {
//             newOTP[index] = '';
//             setOTP(newOTP);
//         }

//         if (index === length - 1 && newOTP.every((digit) => digit !== '')) {
//             onComplete(newOTP.join(''));
//         } else if (value !== '' && index < length - 1) {
//             inputsRef.current[index + 1]?.focus();
//         }

//         setOtpValue(newOTP.join(''))
//     };

//     const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
//             inputsRef.current[index - 1]?.focus();
//         }
//     };

//     const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const pasteData = e.clipboardData?.getData('text/plain') || '';
//         const newOTP = pasteData
//             .slice(0, length)
//             .split('')
//             .map((char) => (isNaN(parseInt(char, 10)) ? '' : char));
//         setOTP(newOTP);
//     };

//     return (
//         <div>
//         {otp.map((digit, index) => (
//             <input
//                 key={index}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 required={true}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
//                 onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
//                 onPaste={(e: ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
//                 ref={(input) => (inputsRef.current[index] = input)}
//                 style={{ width: '2em', marginRight: '0.5em' }}
//             />
//         ))}
//         </div>
//     );
// };

// export default OtpInputField;
