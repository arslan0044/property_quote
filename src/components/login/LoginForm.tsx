"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./inputs";
import axios from "axios";
import { toast } from 'react-toastify';
const LoginForm: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", user);
      console.log("Login success", response.data);

      const { isAdmin,name } = response.data;
      router.push(isAdmin ? "/admin" : "/client");
      toast.success(`${name} Login success`);

    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <form
      onSubmit={onLogin}
      className="formLogin w-[30%] bg-transparent py-4 px-6 rounded-xl"
    >
      <h2 className="text-5xl font-bold mb-7 text-gray-800 border-b pb-4 border-gray-300">
        {loading ? "Processing" : "Sign in"}
      </h2>

      <div className="mb-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="w-full p-2 bg-black text-white rounded-md text-[18px] font-bold mt-4 hover:bg-gray-900"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
