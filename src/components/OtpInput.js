import React, { useRef, useState } from "react";

function OtpInput({ numberOfDigits, onComplete }) {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const otpBoxReference = useRef([]);

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }

    // If all digits are filled, call onComplete
    if (value && index === numberOfDigits - 1) {
      onComplete(newArr.join(""));
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
          ref={(reference) => (otpBoxReference.current[index] = reference)}
          className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-purple-500 focus:outline-none"
          type="text"
          inputMode="numeric"
          pattern="\d*"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}

export default OtpInput;
