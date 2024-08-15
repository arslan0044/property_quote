"use client";
import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import SalesClientComp from "@/components/client/Sale";
import BuyingClientComp from "@/components/client/Buying";
import SaleAndPurchase from "@/components/client/SaleAndPurchase";
import TRANSFER_OF_EQUITY from "@/components/client/TRANSFER_OF_EQUITY";
import RemogtageClient from "@/components/client/Remogtage";

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
  [QuoteTypeEnum.TRANSFER_OF_EQUITY]: TRANSFER_OF_EQUITY,
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

interface Calculator {
  id: number;
  name: string;
}

const ClientPage: FC = () => {
  const [activeButtonType, setActiveButtonType] =
    useState<QuoteTypeEnum | null>(null);
  const [show, setShow] = useState(false);
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [selectedCalculator, setSelectedCalculator] = useState<string>("");

  useEffect(() => {
    const fetchCalculators = async () => {
      try {
        const response = await axios.get("/api/calculators");
        setCalculators(response.data);
      } catch (error) {
        console.error("Error fetching calculators:", error);
      }
    };

    fetchCalculators();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCalculator(selectedValue);
    if (selectedValue !== "") {
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
       {selectedCalculator === "" && <option value="">Select an option</option>}
        {calculators.map((calculator) => (
          <option key={calculator.id} value={calculator.name}>
            {calculator.name}
          </option>
        ))}
      </select>
      {show && (
        <div className="main">
          <div className="parent-basic flex flex-wrap ">
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
