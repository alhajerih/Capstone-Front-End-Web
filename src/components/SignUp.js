"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

// Import API functions from auth.js
import {
  generateOTP,
  validateOTP,
  registerUser,
  saveSelectedCards,
  getBankCards,
} from "@/app/api/actions/auth";

export default function signUp() {
  const [userInfo, setUserInfo] = useState({
    civilId: "",
    otp: "",
    username: "",
    password: "",
  });
  const [selectedCards, setSelectedCards] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const otpBoxReference = useRef([]);

  // add the data to the userInfo string
  const handleChange = (field) => (e) => {
    setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // reset the userInfo string
  const resetUserInfo = () => {
    setUserInfo({
      civilId: "",
      otp: "",
      username: "",
      password: "",
    });
  };

  // Step 1: Generate OTP
  const handleCivilIdSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await generateOTP(userInfo.civilId);
      console.log(result);
      setStep(2);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Failed to send OTP. Please try again.");
    }
  };

  function handleOtpChange(value, index) {
    let newArr = [...otpValues];
    newArr[index] = value;
    setOtpValues(newArr);

    if (value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }

    // Update userInfo.otp when all digits are filled
    if (value && index === 5) {
      const otpValue = newArr.join("");
      setUserInfo((prev) => ({ ...prev, otp: otpValue }));
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  // Step 2: Validate OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await validateOTP(userInfo.otp);
      console.log("Token:", token);
      setStep(3);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Invalid OTP. Please try again.");
    }
  };

  // Step 3: Register User
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await registerUser(
        userInfo.civilId,
        userInfo.username,
        userInfo.password
      );
      console.log(result);
      setStep(4);

      // Fetch available cards for the next step
      await loadAvailableCards();
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Failed to register user. Please try again.");
    }
  };

  // Fetch available cards
  const loadAvailableCards = async () => {
    setIsLoadingCards(true);
    setError("");
    try {
      const cards = await getBankCards();
      console.log("Fetched Cards:", cards);
      setAvailableCards(cards);
    } catch (err) {
      console.error("Error fetching cards:", err.message);
      setError(err.message || "Failed to load available cards.");
    } finally {
      setIsLoadingCards(false);
    }
  };

  // Step 4: Save Selected Cards
  const handleCardSelection = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (selectedCards.length === 0) {
        throw new Error("Please select at least one card to link.");
      }
      const result = await saveSelectedCards(selectedCards);
      console.log(result);
      alert("Account setup complete!");

      // Reset state for next register
      setStep(1);
      resetUserInfo();
      setSelectedCards([]);
      setAvailableCards([]);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Failed to save selected cards.");
    }
  };

  const getCardLogos = (bankName, cardType) => {
    const logos = [];

    // Bank Logo
    switch (bankName) {
      case "Nomo":
        logos.push("/NomoLogo.png");
        break;
      case "Boubyan":
        logos.push("/BoubyanLogo.png");
        break;
    }

    // Card Type Logo
    switch (cardType) {
      case "VISA":
        logos.push("/VisaPlatinumLogo.png");
        break;
      case "Mastercard":
        logos.push("/MasterCardLogo.png");
        break;
    }

    return logos;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Verify Your Identity</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleCivilIdSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="civilId">
                Enter your Civil ID to get started.
              </Label>
              <Input
                id="civilId"
                value={userInfo.civilId}
                onChange={handleChange("civilId")}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#A855F7] hover:bg-purple-600 text-white transition-colors"
            >
              Send OTP
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="block text-center">
                We've sent a 6-digit code to your phone number ending in ***332.
              </Label>
              <div className="flex items-center justify-center gap-4">
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                    ref={(reference) =>
                      (otpBoxReference.current[index] = reference)
                    }
                    className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-purple-500 focus:outline-none"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#A855F7] hover:bg-purple-600 text-white transition-colors"
            >
              Verify OTP
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={userInfo.username}
                onChange={handleChange("username")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userInfo.password}
                onChange={handleChange("password")}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#A855F7] hover:bg-purple-600 text-white transition-colors"
            >
              Set Credentials
            </Button>
          </form>
        )}

        {step === 4 && (
          <>
            {isLoadingCards ? (
              <p className="text-center">Loading cards...</p>
            ) : (
              <form onSubmit={handleCardSelection} className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">
                  Select Cards to Link
                </h2>
                <div className="space-y-3">
                  {availableCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={`card-${card.id}`}
                        checked={selectedCards.includes(card.id)}
                        onCheckedChange={(checked) => {
                          setSelectedCards(
                            checked
                              ? [...selectedCards, card.id]
                              : selectedCards.filter((id) => id !== card.id)
                          );
                        }}
                        className="mr-4"
                      />
                      <div className="flex flex-1 items-center gap-4">
                        {/* Bank Logo */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 relative">
                            <Image
                              src={
                                getCardLogos(card.bankName, card.cardType)[0]
                              }
                              alt={`${card.bankName} logo`}
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                          {/* Card Type Logo */}
                          <div className="w-12 h-8 relative">
                            <Image
                              src={
                                getCardLogos(card.bankName, card.cardType)[1]
                              }
                              alt={`${card.cardType} logo`}
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                        </div>

                        {/* Card Information */}
                        <div className="flex flex-1 items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {card.bankName} {card.cardType}
                            </span>
                            <span className="text-sm text-gray-500">
                              **** **** **** {card.cardNumber.slice(-4)}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-green-600 font-medium">
                              {card.cardBalance.toLocaleString()} KD
                            </span>
                            <div className="text-sm text-gray-500">
                              Acc: {card.accountNumber}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#A855F7] hover:bg-purple-600 text-white transition-colors mt-6"
                >
                  Complete Setup
                </Button>
              </form>
            )}
          </>
        )}
        <p className="text-center text-sm text-gray-500 mt-4">
          You already have an account?{" "}
          <a
            href="/login"
            className="text-[#A855F7] hover:text-purple-600 font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
