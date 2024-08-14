"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from "next/image";
import { toast } from "react-toastify";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

const EditUserForm = ({ params }: { params: { id: string } }) => {
  const [initialUser, setInitialUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    createdAt: "",
    updatedAt: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/user/${params.id}/`)
      .then((response) => {
        const userData = response.data.user;
        setInitialUser(userData);
        setUpdatedUser(userData);
        toast.success(`${userData.name} is Update Sucessfully`)
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/api/user/${params.id}`,   updatedUser )
      .then((response) => {
        toast.success(`${response.data.user.name} is updated successfully! `)
        setInitialUser(updatedUser); 
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
        toast.error("Error to update User")
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (!initialUser) return ( <div className="flex justify-center py-5">
    <Image
      width={200}
      height={240}
      src="/assets/load.gif"
      alt="Loader..."
      className="load-img"
    />
  </div>);

  return (
    <div className="flex flex-col items-center justify-center py-2 gap-8">
      <h1 className="text-left text-5xl py-4 font-bold text-gray-700">
        {loading ? "Processing" : `Update  User`}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-[400px] py-6 px-8 rounded-xl"
      >
        {['name', 'username', 'email', 'password'].map(field => (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={field} className="text-gray-600 font-medium text-2xl">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="relative">
              <input
                id={field}
                name={field}
                type={field === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                value={updatedUser[field as keyof User] as string}
                onChange={handleChange}
                required
                className="text-left border rounded-lg p-2 w-full"
              />
              {field === 'password' && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={updatedUser.isAdmin}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label htmlFor="isAdmin" className="text-gray-600 font-medium text-2xl">
            Admin
          </label>
        </div>
        <button
          type="submit"
          className="p-2 rounded-lg shadow-lg bg-black text-white text-xl font-bold py-3 hover:bg-gray-900 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : `Update User`}
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;