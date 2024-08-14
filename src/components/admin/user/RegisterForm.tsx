import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  isAdmin: boolean;
  password: string;
}

interface RegisterFormProps {
  onRegister?: (newUser: User) => void;
  user?: User;
  onClose?: () => void;
  onUpdate?: (updatedUser: User) => void;
}

const initialUserState: User = {
  id: "",
  name: "",
  email: "",
  username: "",
  isAdmin: false,
  password: "",
};

function RegisterForm({
  onRegister,
  user: initialUser,
  onClose,
  onUpdate,
}: RegisterFormProps) {
  const [user, setUser] = useState<User>(initialUser ?? initialUserState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(initialUser ?? initialUserState);
  }, [initialUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!user.name || !user.email || !user.username || !user.password) {
      alert("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert("Invalid email format");
      return false;
    }
    if (user.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios[user.id ? "put" : "post"](
        user.id ? `/api/user/${user.id}` : "/api/user/register",
        user
      );

      toast.success(
        `${user.name} ${user.id ? "updated" : "registered"} successfully`
      );
      (user.id ? onUpdate : onRegister)?.(response.data.user || response.data);
      onClose?.();
    } catch (error: any) {
      alert(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 gap-8">
      <h1 className="text-left text-5xl py-4 font-bold text-gray-700">
        {loading ? "Processing" : `${user.id ? "Update" : "Register"} User`}
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 w-[400px] py-6 px-8 rounded-xl"
      >
        {["name", "username", "email", "password"].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label
              htmlFor={field}
              className="text-gray-600 font-medium text-2xl"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={field === "password" ? "password" : "text"}
              value={user[field as keyof User] as string}
              onChange={handleChange}
              required
              className="text-left"
            />
          </div>
        ))}
        <div className="flex gap-3 w-full">
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={user.isAdmin}
            onChange={handleChange}
          />
          <label
            htmlFor="isAdmin"
            className="text-gray-600 font-medium text-2xl"
          >
            Admin
          </label>
        </div>
        <button
          type="submit"
          className="p-2 rounded-lg shadow-lg bg-black text-white text-xl font-bold py-3 hover:bg-gray-900 disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `${user.id ? "Update" : "Register"} User`}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
