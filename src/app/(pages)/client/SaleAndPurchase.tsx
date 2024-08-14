import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SalesClientComp from "./SaleClient";
import BuyingClientComp from "./Buying";

function SaleAndPurchase() {
  return (
    <div>
      <div className="flex px-3">
        <SalesClientComp />
        <BuyingClientComp />
      </div>
    </div>
  );
}

export default SaleAndPurchase;
