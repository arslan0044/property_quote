"use client";
import Navigation from "@/components/Navigation";
import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Added state for isAdmin
  const [name, setName] = useState<string>(" "); // Added state for isAdmin
  const [email, setEmail] = useState<string>(" "); // Added state for isAdmin
  const [id, setId] = useState<number>(10); // Added state for isAdmin
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      if (response.data.success) {
        toast.success(`${name} ${response.data.message}`);
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  useEffect(() => {
    const fetchAdminStatus = async () => {
      const response = await axios.get(`/api/user/profile`);
      setIsAdmin(response.data.data.isAdmin); // Set isAdmin state
      setName(response.data.data.name); // Set setName state
      setEmail(response.data.data.email); // Set setEmail state
      setId(response.data.data.id); // Set setId state
    };
    fetchAdminStatus();
  }, []); // Fetch admin status on component mount

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Navigation
        toggleSidebar={toggleSidebar}
        isOpen={isOpen}
        isAdmin={isAdmin}
        name={name}
        email={email}
        id={id}
        handleLogout={handleLogout}
      />

      <div
        className={`flex-1 mt-o p-4 ${
          isOpen ? "ml-[28rem]" : "ml-0"
        } transition-all duration-300 ease-in-out`}
      >
        <SideBar
          isOpen={isOpen}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
        />
        {children}
      </div>
    </div>
  );
}
