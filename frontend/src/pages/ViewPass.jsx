// import React, { useState } from "react";
// import axios from "axios";

// const BusPassDownloadCard = () => {
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleDownload = async () => {
//     setLoading(true);
//     setSuccessMsg("");
//     setErrorMsg("");
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/download-bus-pass",
//         {
//           responseType: "blob",
//           withCredentials: true,
//         }
//       );

//       // Get filename from headers
//       let filename = "bus-pass.pdf";
//       const disposition = response.headers["content-disposition"];
//       if (disposition && disposition.includes("filename=")) {
//         filename = disposition.split("filename=")[1].replace(/"/g, "");
//       }

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//       setSuccessMsg("🎉 Bus Pass downloaded successfully!");
//     } catch (err) {
//       setErrorMsg("❌ " + (err.message || "Unable to download PDF."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-gradient-to-br from-blue-50 via-yellow-50 to-white rounded-2xl shadow-xl p-8 text-center">
//       <div className="mb-6">
//         <span className="text-5xl mb-2 inline-block">🚌</span>
//         <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
//           CampusCommute Bus Pass
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Download your official bus pass as a PDF
//         </p>
//       </div>
//       <button
//         onClick={handleDownload}
//         disabled={loading}
//         className={`w-full flex items-center justify-center gap-2 py-3 mt-4 mb-2 rounded-lg font-semibold text-lg transition
//           ${
//             loading
//               ? "bg-blue-200 text-blue-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-blue-700 to-yellow-500 text-white hover:from-blue-800 hover:to-yellow-600 shadow-md"
//           }`}
//       >
//         {loading ? (
//           <svg
//             className="animate-spin h-6 w-6 text-yellow-500"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8z"
//             ></path>
//           </svg>
//         ) : (
//           <>
//             <span className="text-xl">⬇️</span>
//             Download PDF
//           </>
//         )}
//       </button>
//       {successMsg && (
//         <div className="bg-green-50 text-green-700 rounded-md py-2 px-4 mt-3 font-medium animate-fade-in">
//           {successMsg}
//         </div>
//       )}
//       {errorMsg && (
//         <div className="bg-red-50 text-red-700 rounded-md py-2 px-4 mt-3 font-medium animate-fade-in">
//           {errorMsg}
//         </div>
//       )}
//       <div className="mt-8 text-gray-400 text-sm">
//         Need help?{" "}
//         <a
//           href="mailto:support@campuscommute.com"
//           className="underline hover:text-blue-700"
//         >
//           Contact Support
//         </a>
//       </div>
//     </div>
//   );
// };

// export default BusPassDownloadCard;









// frontend/components/BusPassDownloadCard.jsx
import React, { useState } from "react";
import axios from "axios";

const BusPassDownloadCard = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const response = await axios.get(
        "http://localhost:3000/download-bus-pass",
        {
          responseType: "blob",
          withCredentials: true,
        }
      );
      let filename = "bus-pass.pdf";
      const disposition = response.headers["content-disposition"];
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setSuccessMsg("🎉 Bus Pass downloaded successfully!");
    } catch (err) {
      setErrorMsg("❌ " + (err.response?.data?.error || err.message || "Unable to download PDF."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gradient-to-br from-blue-50 via-yellow-50 to-white rounded-2xl shadow-xl p-8 text-center">
      <div className="mb-6">
        <span className="text-5xl mb-2 inline-block">🚌</span>
        <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
          CampusCommute Bus Pass
        </h2>
        <p className="text-gray-600 mt-2">
          Download your official bus pass as a PDF
        </p>
      </div>
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-3 mt-4 mb-2 rounded-lg font-semibold text-lg transition 
          ${
            loading
              ? "bg-blue-200 text-blue-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-700 to-yellow-500 text-white hover:from-blue-800 hover:to-yellow-600 shadow-md"
          }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-6 w-6 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        ) : (
          <>
            <span className="text-xl">⬇️</span>
            Download PDF
          </>
        )}
      </button>
      {successMsg && (
        <div className="bg-green-50 text-green-700 rounded-md py-2 px-4 mt-3 font-medium animate-fade-in">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 text-red-700 rounded-md py-2 px-4 mt-3 font-medium animate-fade-in">
          {errorMsg}
        </div>
      )}
      <div className="mt-8 text-gray-400 text-sm">
        Need help?{" "}
        <a
          href="mailto:support@campuscommute.com"
          className="underline hover:text-blue-700"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default BusPassDownloadCard;
