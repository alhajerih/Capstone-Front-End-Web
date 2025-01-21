"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/token";
import Dashboard from "@/components/Dashboard";

function DashboardPage() {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default DashboardPage;
