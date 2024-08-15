import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
interface Calculator {
  id: number;
  name: string;
}
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}
const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [calculator, setCalculator] = useState<Calculator[]>([]);
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<User[]>("/api/user/userlist");
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await axios.get<Customer[]>("/api/customer/");
        setCustomer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  useEffect(() => {
    const fetchCalculator = async () => {
      try {
        const { data } = await axios.get<Calculator[]>("/api/calculators/");
        setCalculator(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalculator();
  }, []);

  const adminUsers = users.filter((user) => user.isAdmin);
  const regularUsers = users.filter((user) => !user.isAdmin);

  return (
    <div className=" flex justify-around flex-row">
      <div className=" border rounded-xl dashboard w-fit py-8 px-32 shadow-xl text-3xl">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="gap-7 flex flex-col items-center">
            <h1>Total Users: {users.length}</h1>
            <h2>Admin Users: {adminUsers.length}</h2>
            <h2>Regular Users: {regularUsers.length}</h2>
            <Link
              href={"/admin/users/"}
              className=" text-blue-500 hover:text-blue-600 hover:no-underline underline-offset-4 underline"
            >
              Visit User
            </Link>
          </div>
        )}
      </div>
      <div className=" border rounded-xl dashboard w-fit py-8 px-32 shadow-xl text-3xl">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="h-[10rem] flex flex-col gap-8 items-center justify-center">
            <h1>Total Calculator: {calculator.length}</h1>
            <Link
              href={"/admin/calculator/"}
              className=" text-blue-500 hover:text-blue-600 hover:no-underline underline-offset-4 underline"
            >
              Visit Calculators
            </Link>
          </div>
        )}
      </div>
      <div className=" border rounded-xl dashboard w-fit py-8 px-32 shadow-xl text-3xl">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="h-[10rem] flex flex-col gap-8 items-center justify-center">
            <h1>Total Customer: {customer.length}</h1>
            <Link
              href={"/client/customer"}
              className=" text-blue-500 hover:text-blue-600 hover:no-underline underline-offset-4 underline"
            >
              Visit Customer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
