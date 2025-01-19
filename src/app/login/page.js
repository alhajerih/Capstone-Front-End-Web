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
  getBankCards, // Fetch cards from the backend
} from "../api/actions/auth";

export default function LoginPage() {
  const [civilId, setCivilId] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // Step 1: Generate OTP
  const handleCivilIdSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await generateOTP(civilId); // Generate OTP
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
      const token = await validateOTP(otp); // Validate OTP and store the token
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
      const result = await registerUser(civilId, username, password); // Register user
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
      const cards = await getBankCards(); // Fetch cards using token
      console.log("Fetched Cards:", cards);
      setAvailableCards(cards); // Update available cards
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
      const result = await saveSelectedCards(selectedCards); // Save selected cards
      console.log(result);
      alert("Account setup complete!");

      // Reset state for next login
      setStep(1);
      setCivilId("");
      setOtp("");
      setUsername("");
      setPassword("");
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
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Step 1: Enter Civil ID */}
        {step === 1 && (
          <form onSubmit={handleCivilIdSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="civilId">Civil ID</Label>
              <Input
                id="civilId"
                value={civilId}
                onChange={(e) => setCivilId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">6-Digit OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        )}

        {/* Step 3: Set Credentials */}
        {step === 3 && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Set Credentials
            </Button>
          </form>
        )}

        {/* Step 4: Select Cards */}
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
                <Button type="submit" className="w-full">
                  Complete Setup
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
