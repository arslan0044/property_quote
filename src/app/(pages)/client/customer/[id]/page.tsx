"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const CustomerEditPage: React.FC<{ params: { id: string } }> = ({
  params,
}: {
  params: { id: string };
}) => {
    const id = params.id;
    const [customer, setCustomer] = useState<Customer>({ id: '', name: '', email: '', phone: '' });
    const [loading, setLoading] = useState<boolean>(true); // Initialize loading to true
  
    useEffect(() => {
      if (id) {
        const fetchCustomer = async () => {
          try {
            const response = await axios.get(`/api/customer/${id}`);
            setCustomer(response.data);
          } catch (error) {
            toast.error('Failed to fetch customer data.');
          } finally {
            setLoading(false); // Set loading to false after data is fetched
          }
        };
        fetchCustomer();
      }
    }, [id]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.put(`/api/customer/${id}`, customer);
        toast.success('Customer updated successfully!');
      } catch (error) {
        toast.error('Failed to update customer.');
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return(
        <div className="flex justify-center py-5">
        <Image
          width={200}
          height={240}
          src="/assets/load.gif"
          alt="Loader..."
          className="load-img"
        />
      </div>
      );
    }

  return (
    <div className="flex flex-col items-center justify-center py-2 gap-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-[400px] py-6 px-8 rounded-x"
      >
        <h2 className="text-left text-5xl py-4 font-bold text-gray-700">
          Edit {customer.name} Customer
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium text-2xl" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={customer.name}
            onChange={handleChange}
            className="text-left"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium text-2xl" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={customer.email}
            onChange={handleChange}
            className="text-left"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium text-2xl" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={customer.phone}
            onChange={handleChange}
            className="text-left"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-lg shadow-lg bg-black text-white text-xl font-bold py-3 hover:bg-gray-900 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Customer"}
        </button>
      </form>
    </div>
  );
};

export default CustomerEditPage;
