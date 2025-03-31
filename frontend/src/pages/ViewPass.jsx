// import React from 'react'

// function ViewPass() {
//   return (
//     <div>ViewPass</div>
//   )
// }

// export default ViewPass





import React from "react";
import ApplyPass from "./ApplyPass";


const DownloadBusPass = () => {
  const handleDownload = async () => {
    const response = await fetch("/download-bus-pass", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
   
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bus-pass.pdf";
      link.click();
    } else {
      alert("Failed to download bus pass.");
    }
  };

  return (
    <div>
      <div>
        <ApplyPass/>

      </div>
      <button onClick={handleDownload}>Download Bus Pass</button>;
    </div>
  );
};

export default DownloadBusPass;


