"use client";
import React, { FC, useState } from "react";
import SalesClientComp from "./SaleClient";
import BuyingClientComp from "./Buying";
import SaleAndPurchase from "./SaleAndPurchase";
import QuoteTypeDetails from "./clientPage";
import RemogtageClient from "./Remogtage"; // Adjust the import path as needed

enum QuoteTypeEnum {
  SALE = "SALE",
  PURCHASE = "PURCHASE",
  SALEANDPURCHASE = "SALEANDPURCHASE",
  TRANSFER_OF_EQUITY = "TRANSFER_OF_EQUITY",
  REMORTGAGE = "REMORTGAGE",
}

interface Button {
  label: string;
  type: QuoteTypeEnum;
}

// Define the components to show for each button type
const ComponentMap: Record<QuoteTypeEnum, FC<{ type: QuoteTypeEnum }>> = {
  [QuoteTypeEnum.SALE]: SalesClientComp,
  [QuoteTypeEnum.PURCHASE]: BuyingClientComp,
  [QuoteTypeEnum.REMORTGAGE]: RemogtageClient,
  [QuoteTypeEnum.SALEANDPURCHASE]: SaleAndPurchase,
  [QuoteTypeEnum.TRANSFER_OF_EQUITY]: QuoteTypeDetails,
};

// Updated buttons array with correct label and type
const buttons: Button[] = [
  {
    label: "Property Sale",
    type: QuoteTypeEnum.SALE,
  },
  {
    label: "Property Purchase",
    type: QuoteTypeEnum.PURCHASE,
  },
  {
    label: "Sale and Purchase",
    type: QuoteTypeEnum.SALEANDPURCHASE,
  },
  {
    label: "Transfer of Equity",
    type: QuoteTypeEnum.TRANSFER_OF_EQUITY,
  },
  {
    label: "Remogtage",
    type: QuoteTypeEnum.REMORTGAGE,
  },
];

const ClientPage: FC = () => {
  const [activeButtonType, setActiveButtonType] =
    useState<QuoteTypeEnum | null>(null);
  const [show, setShow] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "showOptions") {
      setShow(true);
    }
  };

  const handleClick = (type: QuoteTypeEnum) => {
    setActiveButtonType(type);
  };

  // Conditionally render the active component based on the button type
  const ActiveComponent = activeButtonType
    ? ComponentMap[activeButtonType]
    : null;

  return (
    <>
      <select
        className="px-3 py-2 text-2xl text-gray-600 items-center flex bg-gray-300 rounded-md w-[25%] font-bold"
        onChange={handleSelectChange}
      >
        <option value="">Select an option</option>
        <option value="showOptions">Show Options</option>
        <option value="hideOptions">Hide Options</option>
      </select>
      {show && (
        <div className="main">
          <div className="parent-basic">
            {buttons.map((button) => (
              <button
                key={button.label}
                className={
                  activeButtonType !== button.type
                    ? "button-primary button-primary-small"
                    : "secondary-button"
                }
                onClick={() => handleClick(button.type)}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Render the component based on the active button */}
          {ActiveComponent && <ActiveComponent type={activeButtonType!} />}
        </div>
      )}
    </>
  );
};

export default ClientPage;
