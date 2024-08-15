import React from "react";
import SalesClientComp from "./Sale";
import BuyingClientComp from "./Buying";

function SaleAndPurchase() {
  return (
    <div>
      <div className="flex px-3 gap-8">
        <SalesClientComp />
        <BuyingClientComp />
      </div>
    </div>
  );
}

export default SaleAndPurchase;