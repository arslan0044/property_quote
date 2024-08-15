import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

interface Calculator {
  id: number;
  name: string;
}

const CalculatorTable: React.FC = () => {
  const [tableData, setTableData] = useState<Calculator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [id, setId] =useState(0)

  useEffect(() => {
    const fetchCalculators = async () => {
      try {
        const response = await axios.get("/api/calculators");
        setTableData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching calculators:", err);
        setError("Failed to load calculators. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCalculators();
  }, []);
  const deleteCalculator = async (id: number) => {
    try {
      await axios.delete(`/api/test/${id}`);
      toast.success(` ${id} Calculator deleted successfully`);
      // Redirect to calculator list or home page
    } catch (error) {
      console.error("Error deleting calculator:", error);
      toast.error("Error deleting calculator");
    }
  };

  if (isLoading) {
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
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const ButtonOptions = ({ id }: { id: number }) => (
    <div className="flex gap-5 items-center justify-center">
      <Link
        href={`/admin/calculator/${id}`}
        className="bg-gray-500 text-slate-50 py-2 px-6 shadow-md rounded-md text-xl font-bold"
      >
        Edit
      </Link>
      <button onClick={() => (setShowConfirmModal(true), setId(id))}>
        <FaRegTrashAlt className={` shadow-md cursor-pointer text-4xl`} />
      </button>
     
    </div>
  );
  const ConfirmModal: React.FC<{
    isOpen: boolean;
  
    onClose: () => void;
    onConfirm: () => void;
  }> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-4xl font-bold mb-4">Confirm Deletion</h3>
          <p className="mb-6 text-3xl">
            Are you sure you want to delete this field?
          </p>
          <div className="flex justify-end  gap-4">
            <button
              onClick={onClose}
              className="px-4 text-3xl py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-3xl text-white rounded-md"
            >
              Delete {id}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-[70%]">
      <table className=" w-full mt-8 shadow-md">
        <thead className="secondary-background text-white">
          <tr>
            {["Id", "Name", "Options"].map((header) => (
              <th key={header} className="text-2xl p-2 capitalize">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="text-2xl p-2 capitalize text-center font-bold text-gray-600 py-4">
                {item.id}
              </td>
              <td className="text-2xl p-2 capitalize text-center font-bold text-gray-600 py-4">
                {item.name}
              </td>
              <td className="text-2xl p-2 capitalize text-center font-bold text-gray-600 py-4">
                <ButtonOptions id={item.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal

        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          deleteCalculator(id);
          setShowConfirmModal(false);
        }}
      />
    </div>
  );
};

export default CalculatorTable;
