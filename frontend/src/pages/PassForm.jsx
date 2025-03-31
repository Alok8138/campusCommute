


// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect, useState } from "react";

// const PassForm = () => {
//   // const [isUserPremium, setIsUserPremium] = useState(false);
// //   useEffect(() => {
// //     verifyPremiumUser();
// //   }, []);

// //   const verifyPremiumUser = async () => {
// //     const res = await axios.get(BASE_URL + "/premium/verify", {
// //       withCredentials: true,
// //     });

// //     if (res.data.isPremium) {
// //       setIsUserPremium(true);
// //     }
// //   };

//   const handleBuyClick = async () => {
//     const order = await axios.post(
//       BASE_URL + "/payment/create",
//       {
//         amount: 5000,
//         currency: "INR",
//         receipt: "receipt_12345",
//       },
//       { withCredentials: true }
//     );

//       const { amount, keyId, currency, notes, orderId } = order.data;
//       console.log(order.data);

//     const options = {
//       key: keyId,
//       amount,
//       currency,
//       name: "campusCommute",
//       description: "bus pass registration",
//       order_id: orderId,
//       prefill: {
//         name: notes.name,
//         email: notes.email,
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     //   handler: verifyPremiumUser,
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
//     return (
//       <>
//         <div className="m-10">
//           <div className="flex w-full">
//             <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//               <div>
//                 <h1 className="text-2xl font-bold">Bus Pass Registration</h1>
//               </div>
//               <button
//                 onClick={() => handleBuyClick()}
//                 className="btn btn-primary"
//               >
//                 Proceed Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );

// };
// export default PassForm;














//working fine 1

// import React from "react";
// import axios from "axios";

// const BASE_URL = "http://localhost:3000"; // Replace with your actual base URL

// const PassForm = () => {
//   const handleBuyClick = async () => {
//     try {
//       const order = await axios.post(
//         BASE_URL + "/payment/create",
//         {
//           amount: 5000,
//           currency: "INR",
//           receipt: "receipt_12345",
//         },
//         { withCredentials: true }
//       );

//       const { amount, keyId, currency, notes, orderId } = order.data;

//       const options = {
//         key: keyId,
//         amount: amount.toString(), // Amount in paisa
//         currency,
//         name: "CampusCommute",
//         description: "Bus Pass Registration",
//         order_id: orderId,
//         prefill: {
//           name: notes.name,
//           email: notes.email,
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3498db", // A more modern blue
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
    
//         <button
//           onClick={handleBuyClick}
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Proceed to Payment
//     </button>
    
//   );
// };

// export default PassForm;

//working fine end 1







// ==========================================================================================================================================

















// import React from "react";
// import axios from "axios";

// const BASE_URL = "http://localhost:3000"; // Replace with your actual base URL

// const PassForm = ({
//   feeAmount,
//   email,
//   enrollment,
//   name,
//   mobile,
//   city,
//   stand,
// }) => {
//   const handleBuyClick = async () => {
//     try {
//       console.log("feeAmount before post:", feeAmount, typeof feeAmount);
//       console.log("feeAmount before post:", enrollment, );
//       console.log("feeAmount before post:", stand, );

//       const order = await axios.post(
//         BASE_URL + "/payment/create",
//         {
//           amount: parseInt(feeAmount), // Convert feeAmount to integer
//           currency: "INR",
//           receipt: "receipt_12345",
//           stand,
//           city,
//         },
//         { withCredentials: true }
//       );

//       const { amount, keyId, currency, notes, orderId } = order.data;

//       const options = {
//         key: keyId,
//         amount: amount.toString(), // Amount in paisa
//         currency,
//         name: "CampusCommute",
//         description: "Bus Pass Registration",
//         order_id: orderId,
//         prefill: {
//           name: name, // Use passed name
//           email: email, // Use passed email
//           contact: mobile, // Use passed mobile
//         },
//         theme: {
//           color: "#3498db", // A more modern blue
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-80">
//         <h1 className="text-xl font-bold text-center text-gray-800 mb-4">
//           Bus Pass Registration
//         </h1>
//         <p className="text-gray-700 text-center mb-4">
//           Name: {name}
//           <br />
//           Enrollment: {enrollment}
//           <br />
//           Email: {email}
//           <br />
//           Mobile: {mobile}
//           <br />
//           City: {city}
//           <br />
//           Stand: {stand}
//         </p>
//         <button
//           onClick={handleBuyClick}
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PassForm;






























// import React from "react";
// import axios from "axios";

// const BASE_URL = "http://localhost:3000";

// const PassForm = ({
//   feeAmount,
//   email,
//   enrollment,
//   name,
//   mobile,
//   city,
//   stand,
// }) => {
//   const handleBuyClick = async () => {
//     try {
//       const order = await axios.post(
//         `${BASE_URL}/payment/create`,
//         {
//           amount: parseInt(feeAmount.toString()),
//           currency: "INR",
//           receipt: `receipt_${enrollment}`,
//           stand,
//           city,
//         },
//         { withCredentials: true }
//       );

//       const { amount, keyId, currency, orderId } = order.data;

//       const options = {
//         key: keyId,
//         amount: amount.toString(),
//         currency,
//         name: "CampusCommute",
//         description: "Bus Pass Registration",
//         order_id: orderId,
//         prefill: {
//           name,
//           email,
//           contact: mobile,
//         },
//         theme: {
//           color: "#3498db",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-6">
//       <div className="w-full max-w-xl">
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
//           {/* Elegant Header */}
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-center relative overflow-hidden">
//             <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-6 -rotate-6"></div>
//             <h1 className="text-4xl font-extrabold text-white relative z-10 tracking-wider">
//               Bus Pass Registration
//             </h1>
//             <p className="text-blue-100 mt-2 text-sm relative z-10">
//               Seamless travel starts here
//             </p>
//           </div>

//           {/* User Details Section */}
//           <div className="p-8 space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">
//                   Name
//                 </label>
//                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm">
//                   {name}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">
//                   Enrollment
//                 </label>
//                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm">
//                   {enrollment}
//                 </div>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">
//                   Email
//                 </label>
//                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm">
//                   {email}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">
//                   Mobile
//                 </label>
//                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm">
//                   {mobile}
//                 </div>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">
//                   City
//                 </label>
//                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm">
//                   {city}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">
//                   Stand
//                 </label>
//                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-sm">
//                   {stand}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Payment Section */}
//           <div className="px-8 pb-8">
//             <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-6 flex items-center justify-between shadow-md">
//               <div>
//                 <p className="text-gray-600 font-semibold text-sm">Total Fee</p>
//                 <p className="text-3xl font-bold text-blue-700">₹{feeAmount}</p>
//               </div>
//               <button
//                 onClick={handleBuyClick}
//                 className="
//                   px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl
//                   hover:bg-blue-700 transition-all duration-300
//                   transform hover:-translate-y-1 hover:shadow-lg
//                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
//                 "
//               >
//                 Proceed to Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PassForm;

















































import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const PassForm = ({
  feeAmount,
  email,
  enrollment,
  name,
  mobile,
  city,
  stand,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleBuyClick = async () => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          amount: parseInt(feeAmount.toString()),
          currency: "INR",
          receipt: `receipt_${enrollment}`,
          stand,
          city,
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, orderId } = order.data;

      const options = {
        key: keyId,
        amount: amount.toString(),
        currency,
        name: "CampusCommute",
        description: "Bus Pass Registration",
        order_id: orderId,
        prefill: {
          name,
          email,
          contact: mobile,
        },
        theme: {
          color: "#3498db",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        <div
          className={`
            bg-white rounded-3xl shadow-2xl overflow-hidden 
            transition-all duration-500 
            ${isHovered ? "scale-105 shadow-3xl" : "scale-100"}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glassmorphic Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 blur-xl"></div>
            <div className="relative bg-white/70 backdrop-blur-lg p-8 text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-wider">
                Bus Pass Registration
              </h1>
              <p className="text-gray-600 mt-2 text-sm">
                Your journey begins with a single tap
              </p>
            </div>
          </div>

          {/* User Details Section with Elevated Cards */}
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Name", value: name },
                { label: "Enrollment", value: enrollment },
                { label: "Email", value: email },
                { label: "Mobile", value: mobile },
                { label: "City", value: city },
                { label: "Stand", value: stand },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="
                    bg-gradient-to-br from-white to-blue-50 
                    rounded-2xl 
                    p-4 
                    shadow-md 
                    hover:shadow-xl 
                    transition-all 
                    duration-300 
                    transform 
                    hover:-translate-y-2
                  "
                >
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    {item.label}
                  </label>
                  <div className="text-gray-800 font-medium text-lg">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section with Dynamic Gradient */}
          <div className="px-8 pb-8">
            <div
              className="
                bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 
                rounded-3xl 
                p-6 
                flex 
                items-center 
                justify-between 
                shadow-2xl 
                relative 
                overflow-hidden
              "
            >
              {/* Subtle Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 animate-gradient-x opacity-50"></div>

              <div className="relative z-10">
                <p className="text-white/80 font-medium text-sm">Total Fee</p>
                <p className="text-4xl font-bold text-white">₹{feeAmount}</p>
              </div>
              <button
                onClick={handleBuyClick}
                className="
                  relative 
                  z-10 
                  px-8 
                  py-4 
                  bg-white 
                  text-purple-700 
                  font-bold 
                  rounded-xl 
                  hover:bg-gray-100 
                  transition-all 
                  duration-300 
                  transform 
                  hover:-translate-y-1 
                  hover:shadow-lg 
                  active:scale-95
                "
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-blob {
          animation: blob 15s infinite;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default PassForm;