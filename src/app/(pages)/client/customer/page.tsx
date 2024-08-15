"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import RegisterForm from "@/components/admin/user/RegisterForm";
import Image from "next/image";
import { toast } from "react-toastify";
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface CustomerListProps {
  users: Customer[];
  setUsers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <p className="mb-4 text-3xl">{message}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 text-3xl px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-3xl  text-white rounded"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const UserList: React.FC<CustomerListProps> = ({ users, setUsers }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get<Customer[]>("/api/customer/");
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = useCallback((userId: string) => {
    setDeletingUserId(userId);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deletingUserId) return;
    try {
      await axios.delete(`/api/customer/${deletingUserId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletingUserId)
      );
      toast.success("User deleted successfully");
    } catch (err: any) {
      toast.error(`Failed to delete user: ${err.message}`);
    } finally {
      setDeletingUserId(null);
    }
  }, [deletingUserId, setUsers]);

  if (loading)
    return (
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
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-6xl mb-4 font-bold text-gray-800 text-center">
        User List
      </h1>
      <table className="w-[95%] text-center m-auto">
        <thead>
          <tr className="bg">
            <th className="py-2 px-4 text-2xl font-bold text-white">ID</th>
            <th className="py-2 px-4 text-2xl font-bold text-white">Name</th>
            <th className="py-2 px-4 text-2xl font-bold text-white">Email</th>
            <th className="py-2 px-4 text-2xl font-bold text-white">Phone</th>
            <th className="py-2 px-4 text-2xl font-bold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} customer={user} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        isOpen={!!deletingUserId}
        onClose={() => setDeletingUserId(null)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

const UserRow: React.FC<{
  customer: Customer;
  onDelete: (id: string) => void;
}> = React.memo(({ customer, onDelete }) => (
  <tr className="  border-b border-gray-500">
    <td className="px-4 py-6 text-2xl font-medium">{customer.id}</td>
    <td className="px-4 py-6 text-2xl font-medium">{customer.name}</td>
    <td className="px-4 py-6 text-2xl font-medium">{customer.email}</td>
    <td className="px-4 py-6 text-2xl font-medium">{customer.phone}</td>
    <td className="px-4 py-2 text-2xl font-medium">
      <Link href={`/client/customer/${customer.id}`}>
        <button className="text-blue-500 hover:text-blue-700 mr-2">
          <FaUserEdit className="w-8 h-8 shadow-md cursor-pointer" />
        </button>
      </Link>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => onDelete(customer.id)}
      >
        <FaRegTrashAlt className="w-8 h-8 shadow-md cursor-pointer" />
      </button>
    </td>
  </tr>
));

UserRow.displayName = "UserRow";


function CustomerPage() {
  
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [users, setUsers] = useState<Customer[]>([]);

  const toggleRegisterForm = () => {
    setShowRegisterForm((prevState) => !prevState);
  };
  function CustomerRegisterForm() {
    const [customer, setCustomer] = useState<Customer>({
      id:"",
      name: "",
      email: "",
      phone: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.post("/api/customer", customer);
        toast.success("Customer registered successfully!");
        toggleRegisterForm()
        setCustomer({ id:"", name: "", email: "", phone: "" });
      } catch (error) {
        toast.error("Failed to register customer.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center py-2 gap-8 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-[400px] py-6 px-8 rounded-x"
        >
          <h2 className="ttext-left text-5xl py-4 font-bold text-gray-700">
            Register New Customer
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
            {loading ? "Adding..." : "Add New Customer"}
          </button>
        </form>
      </div>
    );
  }
  //   const handleNewUser = (newUser: Customer) => {
  //     setUsers((prevUsers) => [...prevUsers, newUser]);
  //     setShowRegisterForm(false);
  //   };

  return (
    <>
      <div className="flex justify-center py-4 mb-9">
        <button
          onClick={toggleRegisterForm}
          className={` ${
            showRegisterForm
              ? "button-primary "
              : " admin-link secondary-button"
          }  `}
        >
          {showRegisterForm ? "Show All Customer " : " Add New Customer"}
        </button>
      </div>

      {showRegisterForm ? (
        <CustomerRegisterForm />
      ) : (
        <UserList users={users} setUsers={setUsers} />
      )}
    </>
  );
}

export default CustomerPage ;
