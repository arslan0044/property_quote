import React from "react";
import SalesClientComp from "./Sale";
import BuyingClientComp from "./Buying";

function SaleAndPurchase() {
  return (
    <div>
      <div className="flex px-3 lg:gap-8 flex-col lg:flex-row">
        <SalesClientComp />
        <BuyingClientComp />
      </div>
    </div>
  );
}

export default SaleAndPurchase;