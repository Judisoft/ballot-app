import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import getCookie from "../utils/getCookie";
import Jumbotron from "../components/Jumbotron";
import dateFormatter from "../utils/dateFormatter";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import JsBarcode from "jsbarcode";
import getBarcodeValue from "../utils/getBarcodeValue";

const BallotResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const group = searchParams.get("group");
  const [ballotResult, setBallotResult] = useState([]);

  useEffect(() => {
    const getBallotResult = async () => {
      try {
        const token = getCookie("token");
        const res = await axios.post(
          "http://localhost:5000/api/v1/ballots/ranks",
          { group },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBallotResult(res.data.ballotList);
      } catch (error) {
        console.log(error);
      }
    };
    getBallotResult();
  }, [group]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Calculate the width of the text
    const text = "Ballot Result for " + group;
    const fontSize = 12;
    const textWidth =
      (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor;

    // Calculate the center position for the text
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = (pageWidth - textWidth) / 2;
    doc.text(text, centerX, 10);

    // Get the HTML content of the table
    const table = document.querySelector("table");

    // Generate the table in the PDF document using the autoTable plugin
    doc.autoTable({
      html: table,
      startY: 20,
      theme: "grid",
      styles: { cellPadding: 2, fontSize: 10, textColor: [0, 0, 0] },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    // get barcode value
    const bValue = getBarcodeValue(ballotResult);

    // Generate barcode image
    const barcodeValue = bValue;
    const barcodeMarginTop = 10;
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, barcodeValue, { format: "CODE39" });
    const barcodeDataURL = barcodeCanvas.toDataURL();

    // Draw barcode image onto PDF
    const barcodeImageWidth = 100; // Adjust the width of the barcode image
    const barcodeImageHeight = 30; // Adjust the height of the barcode image
    const barcodeImageX = (pageWidth - barcodeImageWidth) / 2; // Center horizontally
    const barcodeImageY = doc.autoTable.previous.finalY + barcodeMarginTop; // Position below the table
    doc.addImage(
      barcodeDataURL,
      "PNG",
      barcodeImageX,
      barcodeImageY,
      barcodeImageWidth,
      barcodeImageHeight
    );

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = doc.output("bloburl");
    link.download = "ballot-result.pdf";

    link.click();
  };

  return (
    <div>
      <Jumbotron title={`Ballot result for ${group}`} />
      <section className="bg-white mb-16 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="relative overflow-x-auto">
              <table className="w-full max-w-xl mx-auto  rtl:text-right dark:text-gray-400">
                <thead className="font-normal text-left text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 font-semibold text-md text-gray-700">
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-semibold text-md text-gray-700">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-semibold text-md text-gray-700">
                      Date Balloted
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ballotResult.length > 0 ? (
                    // Sort the ballotResult array by rank before mapping over it to order by rank
                    [...ballotResult]
                      .sort((a, b) => a.rank - b.rank)
                      .map((result) => (
                        <tr
                          className="bg-white text-left border-b dark:bg-gray-800 dark:border-gray-700"
                          key={result.userName}>
                          <td className="px-6 py-4 text-md text-gray-500">
                            {result.rank}
                          </td>
                          <td className="px-6 py-4 text-md text-gray-500">
                            {result.userName}
                          </td>

                          <td className="px-6 py-4  text-md text-gray-500">
                            {dateFormatter(result.created_at)}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr className="text-center">No one has balloted yet</tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center pt-8">
                <button
                  className="flex text-white hover:text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={generatePDF}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-download">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span className="px-2">Download result</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BallotResult;
