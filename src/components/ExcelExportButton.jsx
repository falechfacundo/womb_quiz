import React from "react";
import * as XLSX from "xlsx";

const ExcelExportButton = ({
  data,
  fileName = "export",
  filteredCategory = null,
}) => {
  const handleExport = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Format data for Excel
    const formattedData = data.map((result) => ({
      Date: result.created_at ? result.created_at.substring(0, 10) : "N/A",
      Name: result.name || "N/A",
      Email: result.email || "N/A",
      Category: result.category || "N/A",
      Score: result.scores ? result.scores[result.category] : "N/A",
      // Add any other fields you want to include
    }));

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    // Generate file name with date
    const today = new Date().toISOString().split("T")[0];
    const category = filteredCategory ? `-${filteredCategory}` : "";
    const exportFileName = `${fileName}${category}-${today}.xlsx`;

    // Write workbook and trigger download using native browser APIs
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = exportFileName;

    // Trigger download and cleanup
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-golden-600 hover:bg-golden-700 text-rich_black-100 font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      Download Excel
    </button>
  );
};

export default ExcelExportButton;
