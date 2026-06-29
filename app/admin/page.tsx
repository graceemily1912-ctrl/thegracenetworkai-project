"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminClient from "./AdminClient";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Navbar />
      <div className="kola-container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="uppercase text-xs text-[#C5A46E]">SECURE</div>
            <h1 className="text-4xl tracking-tight font-semibold">Admin Dashboard</h1>
          </div>
          <div className="font-mono text-xs bg-white px-3 py-1 rounded border">REALTIME</div>
        </div>

        <AdminClient />

        <div className="text-[10px] mt-10 text-[#6B7280]">Realtime via Convex. Use ADMIN key from environment.</div>
      </div>
    </div>
  );
}
