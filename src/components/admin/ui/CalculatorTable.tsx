import React, { useState, useEffect } from "react";
import { BiHelpCircle, BiHome, BiTrash } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import Image from "next/image";

interface Calculator {
  id: number;
  name: string;
}

const ButtonOptions: React.FC = () => (
  <div className="flex gap-3 items-center justify-center">
    <button className="bg-gray-500 text-slate-50 py-2 px-6 shadow-md rounded-md text-xl font-bold">
      Edit
    </button>
    <button className="bg-blue-600 text-slate-50 py-2 px-6 shadow-md rounded-md text-xl font-bold">
      Duplicate
    </button>
    <button className="py-2 px-6 shadow-md rounded-md text-xl font-bold border border-blue-600">
      Add to Website
    </button>
    <button className="text-4xl shadow-md">
      <BiTrash />
    </button>
  </div>
);

const CalculatorTable: React.FC = () => {
  const [tableData, setTableData] = useState<Calculator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const homeString = "Home > Admin >";

  useEffect(() => {
    const fetchCalculators = async () => {
      try {
        const response = await axios.get("/api/test");
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

  return (
    <div className="mx-auto max-w-[70%]">
      {/* <div className="flex justify-between items-center mt-5 secondary-background p-4 rounded-md ">
        <div className="flex items-center gap-7">
          <p className="flex text-2xl font-bold text-white gap-3 items-center">
            <BiHome /> {homeString}
          </p>
          <p className="text-2xl font-bold text-white">Quote Calculators</p>
        </div>
        <div className="flex items-center gap-7">
          <button className="flex text-2xl font-bold text-white gap-3">
            <MdArrowDropDown className="text-3xl border border-white rounded-sm text-white" />{" "}
            More Option
          </button>
          <button className="flex text-2xl font-bold text-white gap-3 items-center">
            <BiHelpCircle className="text-3xl" /> Help
          </button>
        </div>
      </div> */}
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
          {tableData.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="text-2xl p-2 capitalize text-center font-bold text-gray-600 py-4">
                {item.id}
              </td>
              <td className="text-2xl p-2 capitalize text-center font-bold text-gray-600 py-4">
                {item.name}
              </td>
              <td className="text-2xl p-2 capitalize text-center font-bold text-gray-600 py-4">
                <ButtonOptions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculatorTable;
