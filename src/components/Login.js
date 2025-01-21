"use client";

import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/api/actions/auth";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = await login(userInfo.username, userInfo.password);
      if (token) {
        // Use replace instead of push to prevent going back to login
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={userInfo.username}
              onChange={handleChange("username")}
              required
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#A855F7] hover:bg-purple-600 text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
