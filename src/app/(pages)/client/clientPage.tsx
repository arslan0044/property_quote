import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaMailBulk } from "react-icons/fa";

function QuoteTypeDetails() {
  const quoteData = [
    {
      name: "Sale",
    },
    {
      name: "Purchase",
    },
    {
      name: "Sale & Purchase",
    },
    {
      name: "Remortage",
    },
    {
      name: "transfer of Equity",
    },
  ];
  return (
    <div>
      <div className="w-[90%] mx-auto my-14 dashboard rounded-lg">
        <p className="bg-black text-white text-center font-bold text-3xl py-2 rounded-md">
          Details
        </p>
        <div className="flex gap-6 justify-between p-4">
          <div className="w-[30%] flex flex-col gap-5">
            <p className="text-xl font-medium text-gray-600">
              Quote Calculator{" "}
              <span className="text-red-600 text-2xl font-bold ml-2">*</span>
            </p>
            <select className="px-3 py-2 text-xl text-gray-600 items-center flex bg-gray-300 rounded-md">
              <option>Spencer lookwood Test</option>
              <option>Spencer lookwood Test</option>
              <option>Spencer lookwood Test</option>
              <option>Spencer lookwood Test</option>
              <option>Spencer lookwood Test</option>
            </select>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="checkbox" id="" />
              <p className="text-xl font-medium text-gray-600">
                Attribute to panel member
              </p>
            </div>
          </div>
          <div className="w-[70%] px-4">
            <div className="flex flex-col gap-5 mb-3">
              <p className="font-medium text-xl text-gray-600">
                Quote Type <span className="text-2xl text-red-600 mr-4">*</span>
              </p>
              <div className="flex gap-14 justify-between w-full flex-wrap">
                {quoteData.map((item) => (
                  <div key={item.name} className="flex gap-3">
                    <input type="radio" name="select" id="" />
                    <p className="text-xl font-medium text-gray-600">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 py-14">
              <div className="w-[50%] flex flex-col gap-4">
                <div className="flex gap-3 ">
                  <input type="checkbox" />
                  <p className="font-medium text-xl text-gray-600">
                    Use the land registary to get tenure title number for the
                    property.
                  </p>
                </div>
                <p className="text-xl font-medium text-gray-600 flex gap-3">
                  <FaMailBulk className="text-2xl" /> Send client email from:
                </p>
                <select className="px-3 py-2 text-xl text-gray-600 items-center flex bg-gray-300 rounded-md mr-5">
                  <option>example@techteam.com</option>
                  <option>example@techteam.com</option>
                  <option>example@techteam.com</option>
                  <option>example@techteam.com</option>
                  <option>example@techteam.com</option>
                  <option>example@techteam.com</option>
                  <option>example@techteam.com</option>
                </select>
              </div>
              <div className="w-[50%] flex flex-col gap-5">
                <p className="text-xl font-medium text-gray-600">
                  Custom Message to Client.
                </p>
                <input
                  type="textarea"
                  name=""
                  id=""
                  placeholder="Type a new message"
                  className="w-full h-48 px-2 rounded-md text-left"
                />
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <p className="text-xl font-medium text-gray-600">
                    Use custom message as quote introduction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteTypeDetails;
