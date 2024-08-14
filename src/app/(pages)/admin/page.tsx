"use client";
import CalculatorTable from "@/components/admin/ui/CalculatorTable";
import Link from "next/link";
import React from "react";
import Dashboard from "./calculator/Dashborad";

function AdminPage() {
  return (
    <div className="">
      <h1 className="h-full flex items-center gap-8 justify-center my-8">
        <Link className="client-link button-primary" href="/admin/calculator">
          Calculators
        </Link>
        <Link className="client-link button-primary" href="/admin/users">
          Users
        </Link>
      </h1>
      <CalculatorTable />
      <Dashboard />
    </div>
  );
}

export default AdminPage;
