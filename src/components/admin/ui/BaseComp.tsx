import React from "react";
import FeeTable from "./FeeTable";
import ExtraFeilds from "./ExtraFeilds";

function BaseComp() {
  return (
    <div>
      <FeeTable />
      <div className=" lg:flex-row items-center lg:items-start flex flex-col border-t mt-10 pt-10 border-gray-400">
        <ExtraFeilds Heading="Supplement (ex.VAT)" />
        <ExtraFeilds Heading="Disbursements (ex.VAT)" />
      </div>
    </div>
  );
}

export default BaseComp;
