"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Join us</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleCivilIdSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="civilId">Civil ID</Label>
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
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">6-Digit OTP</Label>
              <Input
                id="otp"
                value={userInfo.otp}
                onChange={handleChange("otp")}
                maxLength={6}
                required
              />
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
                <h2 className="text-lg font-semibold">Select Cards to Link</h2>
                {availableCards.map((card) => (
                  <div key={card.id} className="flex items-center space-x-2">
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
                    />
                    <Label htmlFor={`card-${card.id}`}>
                      {card.bankName} - {card.cardType} (****
                      {card.cardNumber.slice(-4)})
                    </Label>
                  </div>
                ))}
                <Button
                  type="submit"
                  className="w-full bg-[#A855F7] hover:bg-purple-600 text-white transition-colors"
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
