import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

function BuyingClientComp() {
  return (
    <>
      <BuyingBody />
    </>
  );
}

function BuyingBody() {
  const purchaseRules = [
    { name: "Action/Repossession" },
    { name: "Buying But to let 2nd home" },
    { name: "Client is company" },
    { name: "Buing First time buyer" },
    { name: "Gifted Deposit" },
    { name: "Help-To-Buy ISA" },
    { name: "Mortgaged" },
    { name: "New Build" },
    { name: "Buing known Uk Resident" },
    { name: "Right to buy" },
    { name: "Shared ownership" },
    { name: "Buing Unregisterd" },
  ];
  return (
    <div className="w-[50%] mx-auto my-14">
      <div className="dashboard w-full rounded-lg">
        <p className="bg-black text-white py-2 font-bold text-2xl text-center rounded-md">
          Buying a Property
        </p>
        <div className="flex flex-col items-end py-4 px-8 gap-7">
          <div className="flex justify-between w-full items-center">
            <p className="w-[50%] text-xl font-bold text-gray-600">
              Postcode <span className="text-red-600 ml-2">*</span>
            </p>
            <div className="w-[50%] flex gap-7 flex-wrap">
              <input type="text" placeholder="L35 3XE" className="text-left" />{" "}
              <button className="flex bg-black text-white py-3 px-5 rounded-md shadow-md items-center text-xl font-bold">
                <BiSearch className="font-bold text-white text-xl" /> LookUp
              </button>{" "}
              <div className="flex gap-4">
                <input type="checkbox" />
                <p className="font-medium text-gray-600 text-xl">
                  Address Unknown
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <p className="w-[50%] text-xl font-bold text-gray-600">Line 1:</p>
            <input
              type="text"
              name=""
              id=""
              placeholder="11 Deepwood Grove"
              className="w-[50%] text-left"
            />
          </div>
          <div className="flex justify-between w-full items-center">
            <p className="w-[50%] text-xl font-bold text-gray-600">
              Value: <span>*</span>
            </p>
            <input
              type="text"
              placeholder="eg. 15,00,000"
              className="w-[50%] text-left"
            />
          </div>
          <div className="flex justify-between w-full items-center">
            <p className="w-[50%] text-xl font-bold text-gray-600">
              No of people: <span className="text-red-600 ml-3">*</span>
            </p>
            <input type="text" placeholder="2" className="w-[50%] text-left" />
          </div>
          <div className="w-[50%] flex gap-7">
            <div className="flex gap-3 items-center">
              <input type="radio" name="hold" />
              <p className="font-medium text-gray-600 text-xl">Free Hold</p>
            </div>
            <div className="flex gap-3 items-center">
              <input type="radio" name="hold" />
              <p className="font-medium text-gray-600 text-xl">Lease Hold</p>
            </div>
          </div>
          {purchaseRules.map((item) => (
            <div className="flex gap-4 w-[50%]" key={item.name}>
              <input type="checkbox" name="" id="" />
              <p className="font-medium text-gray-600 text-xl">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyingClientComp;
