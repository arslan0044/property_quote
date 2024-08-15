import React from "react";

import { BiSearch } from "react-icons/bi";

function RemogtageClient() {

  return (
    <>
      <div className="w-[90%] md:w-2/4  mx-auto my-14">
        <div className="dashboard w-full rounded-lg">
          <p className="bg-black text-white py-2 font-bold text-2xl text-center rounded-md">
            Remortgage a porperty
          </p>
          <div className="flex flex-col items-end py-4  px-16 gap-7">
           
            <div className="flex justify-between w-full items-center">
              <p className="w-[50%] text-xl font-bold text-gray-600">
                Postcode <span className="text-red-600 ml-2">*</span>
              </p>
              <div className="w-[50%] flex gap-7 flex-col lg:flex-row">
                <input
                  type="text"
                  placeholder="L35 3XE"
                  className="text-left"
                />{" "}
                <button className="flex  bg-black text-white py-3 px-5 rounded-md shadow-md items-center text-xl font-bold">
                  <BiSearch className="font-bold text-white text-xl" /> LookUp
                </button>{" "}
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
                Property Value: <span className="text-red-600 ml-3">*</span>
              </p>
              <input
                type="text"
                placeholder="650000"
                className="w-[50%] text-left"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="w-[50%] text-xl font-bold text-gray-600">
                New mortage Value: <span className="text-red-600 ml-3">*</span>
              </p>
              <input
                type="text"
                placeholder="650000"
                className="w-[50%] text-left"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="w-[50%] text-xl font-bold text-gray-600">
                No of people involved:{" "}
                <span className="text-red-600 ml-3">*</span>
              </p>
              <input
                type="text"
                placeholder="2"
                className="w-[50%] text-left"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="w-[50%] text-xl font-bold text-gray-600">
                Name of currunt landers: <span>*</span>
              </p>
              <input
                type="text"
                placeholder="650000"
                className="w-[50%] text-left"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="w-[50%] text-xl font-bold text-gray-600">
                Account Number: <span className="text-red-600 ml-3">*</span>
              </p>
              <input
                type="text"
                placeholder="650000"
                className="w-[50%] text-left"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="w-[50%] text-xl font-bold text-gray-600">
                Name of propsed new landers.:{" "}
                <span className="text-red-600 ml-3">*</span>
              </p>
              <input
                type="text"
                placeholder="650000"
                className="w-[50%] text-left"
              />
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
            <div className="flex gap-4 w-[50%]">
              <input type="checkbox" name="" id="" />
              <p className="font-medium text-gray-600 text-xl">
                Client is Company
              </p>
            </div>
            <div className="flex gap-4 w-[50%]">
              <input type="checkbox" name="" id="" />
              <p className="font-medium text-gray-600 text-xl">
                Sharped Ownership
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemogtageClient;