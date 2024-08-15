import React from "react";

function QuotationReport() {
  return (
    <div className=" w-full flex items-center justify-center">
      <div className="w-4/5 h-screen dashboard gap-4 flex flex-col items-center py-12 ">
        <div className=" w-full items-center flex justify-center text-4xl font-bold">
          Quotation Report
        </div>
        <div>
          <div>Sell</div>
          <table>
            <tr>
              <td>Legal Fees</td>
              <td>£ 495.00</td>
            </tr>
            <tr>
              <td>Legal Fees VAT at 20%</td>
              <td>£ 99.00</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuotationReport;
