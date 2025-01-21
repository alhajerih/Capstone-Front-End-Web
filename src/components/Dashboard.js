"use client";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "@/app/api/actions/auth";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCardImage = (bankName, cardType) => {
    if (bankName === "Nomo") return "/Nomo1.png";
    if (bankName === "Boubyan" && cardType === "VISA")
      return "/BoubyanVisa.png";
    if (bankName === "Boubyan" && cardType === "Mastercard")
      return "/BoubyanMasterCard.png";
    return null;
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserDetails();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  // Filter selected cards
  const selectedCards = user.bankCards.filter((card) => card.selected);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user.username}</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Civil ID:</span> {user.civilId}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {user.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Role:</span> {user.role}
              </p>
            </div>
          </div>

          {/* Bank Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Selected Cards</h2>
            {selectedCards.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-gray-500">
                  No cards have been selected yet.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Please select your cards to view them here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Card Image */}
                    <div className="relative w-64 h-40 flex-shrink-0">
                      <Image
                        src={getCardImage(card.bankName, card.cardType)}
                        alt={`${card.bankName} ${card.cardType} Card`}
                        width={256}
                        height={160}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Card Details */}
                    <div className="ml-8 flex-grow">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">
                          {card.bankName} {card.cardType}
                        </h3>
                        <p className="font-mono text-gray-600 text-lg">
                          **** **** **** {card.cardNumber.slice(-4)}
                        </p>
                        <p className="text-green-600 font-medium text-lg">
                          Balance: ${card.cardBalance.toLocaleString()}
                        </p>
                        <p className="text-gray-500">
                          Account: {card.accountNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hub Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Hub Status</h2>
          <div className="border rounded-lg p-4 bg-gray-50">
            <p>Hub ID: {user.hub.id}</p>
            <p>Status: {user.hub.active ? "Active" : "Inactive"}</p>
            <p>Number of Linked Cards: {user.hub.linkedCards?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
