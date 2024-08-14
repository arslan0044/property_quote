"use client";
// import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MenuItem {
  link: string;
  name: string;
}
interface SidebarProps {
  isOpen: boolean;
  handleLogout: () => void;
  isAdmin: boolean
}
const SideBar: React.FC<SidebarProps> = ({ isOpen, isAdmin, handleLogout }) => {
  const router = useRouter();
 
  const data: MenuItem[] = isAdmin 
    ? [ // Show all links if isAdmin is true
        { link: "/admin", name: "Admin" },
        { link: "/admin/users", name: "Users" },
        { link: "/admin/calculator", name: "Calculators" },
        { link: "/client", name: "Client" },
      ] 
    : [ // Show only Client link if isAdmin is false
        { link: "/client", name: "Client" },
      ];
     
    

  return (
    <div>
      <div
        className={`fixed top-32 left-0 h-full transition-transform duration-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-[28rem] sidebar shadow-lg`}
      >
        <div className="flex flex-col items-center gap-6 p-4 mt-12">
          <Image
            src={isAdmin ? "/assets/admin.webp" : "/assets/clientAvatar.webp"}
            width={200}
            height={200}
            className="rounded-full  border border-gray-400"
            alt="profile"
          />
          <ul className="w-full">
            {data.map((item) => (
              <li
                key={item.name}
                className="w-full flex items-center hover:bg-slate-100"
              >
                <Link
                  href={isAdmin ? item.link : "/client"}
                  className="block text-2xl font-bold text-center my-2 bg-gray-200 w-full py-2"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className="bg-black text-2xl py-2 px-4 w-full text-white hover:bg-gray-800 font-bold shadow-lg rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;