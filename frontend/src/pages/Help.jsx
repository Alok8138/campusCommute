import React from 'react'

function Help() {
  return (
    <div>Help</div>
  )
}

export default Help


// import React, { useState } from "react";
// import {
//   ChevronDown,
//   ChevronUp,
//   Search,
//   Download,
//   CreditCard,
//   Bus,
//   Calendar,
//   HelpCircle,
//   Bell,
// } from "lucide-react";

// const Help = () => {
//   const [openSection, setOpenSection] = useState("general");

//   const toggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   const faqSections = [
//     {
//       id: "general",
//       title: "General Information",
//       icon: <HelpCircle className="w-6 h-6 text-indigo-500" />, // Adjusted icon color
//       faqs: [
//         {
//           question: "What is the College Bus Pass System?",
//           answer:
//             "The College Bus Pass System is a comprehensive platform designed for college students to manage their bus transportation needs. It allows you to download bus passes, pay fees, apply for new passes, check bus schedules, and more.",
//         },
//         {
//           question: "How do I create an account?",
//           answer:
//             'To create an account, click on the "Sign Up" button on the homepage. Enter your college email, student ID, create a password, and complete the verification process. Once verified, you can access all features of the system.',
//         },
//         {
//           question: "Is my information secure?",
//           answer:
//             "Yes, we take security seriously. All your personal and payment information is encrypted and stored securely. We follow industry-standard security protocols to protect your data.",
//         },
//       ],
//     },
//     {
//       id: "passes",
//       title: "Bus Passes",
//       icon: <Download className="w-6 h-6 text-teal-500" />, // Adjusted icon color
//       faqs: [
//         {
//           question: "How do I download my bus pass?",
//           answer:
//             'After logging in, navigate to the "My Passes" section. Click on your active pass and select the "Download" button. You can save the pass as a PDF or add it to your mobile wallet for easy access.',
//         },
//         {
//           question: "What if I lose my bus pass?",
//           answer:
//             'If you lose your physical bus pass, don\'t worry! You can always access and download a new copy from your account. Simply log in and go to "My Passes" to download it again.',
//         },
//         {
//           question: "How long is my bus pass valid?",
//           answer:
//             "Bus passes are typically valid for one semester or as specified during purchase. The expiration date is clearly marked on your pass. You will receive notifications when your pass is about to expire.",
//         },
//       ],
//     },
//     {
//       id: "payments",
//       title: "Fee Payments",
//       icon: <CreditCard className="w-6 h-6 text-purple-500" />,
//       faqs: [
//         {
//           question: "How do I pay for my bus pass?",
//           answer:
//             'Go to the "Payments" section and select "Buy/Renew Pass". Choose your preferred pass type, review the details, and proceed to checkout. We accept credit/debit cards and other online payment methods.',
//         },
//         {
//           question: "Are there any discounts available?",
//           answer:
//           'Yes, discounts may be available for semester-long passes, annual passes, or for students with financial aid. Check the "Discounts" tab in the payment section to see if you qualify.',
//         },
//         {
//           question: "How do I view my payment history?",
//           answer:
//             'Your payment history is available in the "Payments" section under "Transaction History". You can filter by date and download receipts for your records or reimbursement purposes.',
//         },
//       ],
//     },
//     {
//       id: "application",
//       title: "Pass Application",
//       icon: <Bus className="w-6 h-6 text-yellow-500" />,
//       faqs: [
//         {
//           question: "How do I apply for a new bus pass?",
//           answer:
//             'Click on "Apply for Pass" in the main navigation. Fill out the required information including your student details, choose your route preferences, select the pass duration, and submit your application.',
//         },
//         {
//           question: "What documents do I need to apply?",
//           answer:
//             "You'll need your student ID, proof of enrollment (can be uploaded from your student portal), and residential address. For special passes or discounts, additional documentation may be required.",
//         },
//         {
//           question: "How long does the approval process take?",
//           answer:
//             "Standard applications are typically processed within 1-2 business days. You will receive notifications about your application status via email and in the app's notification center.",
//         },
//       ],
//     },
//     {
//       id: "schedules",
//       title: "Bus Schedules",
//       icon: <Calendar className="w-6 h-6 text-rose-500" />, // Adjusted icon color
//       faqs: [
//         {
//           question: "How do I check bus schedules?",
//           answer:
//             'Use the "Schedules" section to search for bus routes. You can filter by route number, start/end points, or time of day. The system will show all available buses matching your criteria.',
//         },
//         {
//           question: "Are the schedules updated in real-time?",
//           answer:
//             "Yes, our system connects to the college transportation network to provide real-time updates. You can see if buses are running on schedule or if there are any delays.",
//         },
//         {
//           question: "Can I save favorite routes?",
//           answer:
//             "Yes, you can save your frequently used routes as favorites. Simply click the star icon next to any route to add it to your favorites for quick access in the future.",
//         },
//       ],
//     },
//     {
//       id: "notifications",
//       title: "Notifications",
//       icon: <Bell className="w-6 h-6 text-orange-500" />,
//       faqs: [
//         {
//           question: "How do I manage notifications?",
//           answer:
//             'Go to your profile settings and select "Notification Preferences". You can choose which notifications to receive, including pass expiration reminders, payment confirmations, and schedule changes.',
//         },
//         {
//           question: "Why am I not receiving notifications?",
//           answer:
//             "Check your notification preferences and ensure you have allowed notifications in your browser or device settings. Also, verify that your email address is correct in your profile.",
//         },
//       ],
//     },
//   ];

//   const videoTutorials = [
//     {
//       id: 1,
//       title: "Getting Started with the Bus Pass System",
//       duration: "3:45",
//       thumbnail: "/api/placeholder/320/180",
//       description:
//         "Learn the basics of navigating the system and setting up your account.",
//     },
//     {
//       id: 2,
//       title: "How to Apply for a Bus Pass",
//       duration: "4:20",
//       thumbnail: "/api/placeholder/320/180",
//       description:
//         "Step-by-step guide to completing your bus pass application.",
//     },
//     {
//       id: 3,
//       title: "Managing Payments and Renewals",
//       duration: "5:15",
//       thumbnail: "/api/placeholder/320/180",
//       description:
//         "Learn how to pay fees and renew your existing bus pass efficiently.",
//     },
//     {
//       id: 4,
//       title: "Using the Bus Schedule Finder",
//       duration: "3:30",
//       thumbnail: "/api/placeholder/320/180",
//       description:
//         "Find the perfect bus schedule that fits your college timetable.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white"> {/* Changed background to white for body */}
//       {/* Header */}
//       <header className="bg-gray-900 text-white py-6"> {/* Changed header to black/dark gray */}
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold text-center">Help Center</h1>
//           <p className="text-center mt-2 text-gray-300"> {/* Adjusted text color for header subtitle */}
//             Find answers to all your questions about the College Bus Pass System
//           </p>

//           {/* Search Bar */}
//           <div className="mt-6 max-w-2xl mx-auto relative">
//             <input
//               type="text"
//               placeholder="Search for help topics..."
//               className="w-full px-4 py-3 rounded-lg pl-12 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Adjusted search bar colors
//             />
//             <Search className="absolute left-4 top-3.5 text-gray-400" /> {/* Adjusted search icon color */}
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Left Column - FAQ Categories */}
//           <div className="md:col-span-2">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800"> {/* Adjusted heading color */}
//               Frequently Asked Questions
//             </h2>

//             <div className="space-y-4">
//               {faqSections.map((section) => (
//                 <div
//                   key={section.id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200" // Added subtle border
//                 >
//                   <button
//                     className="w-full px-6 py-4 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors" // Added hover effect
//                     onClick={() => toggleSection(section.id)}
//                   >
//                     <div className="flex items-center">
//                       {section.icon}
//                       <span className="font-medium ml-3 text-lg text-gray-800"> {/* Adjusted text color */}
//                         {section.title}
//                       </span>
//                     </div>
//                     {openSection === section.id ? (
//                       <ChevronUp className="w-5 h-5 text-gray-600" /> 
//                     ) : (
//                       <ChevronDown className="w-5 h-5 text-gray-600" /> 
//                     )}
//                   </button>

//                   {openSection === section.id && (
//                     <div className="px-6 pb-4">
//                       <div className="space-y-4">
//                         {section.faqs.map((faq, index) => (
//                           <div
//                             key={index}
//                             className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
//                           >
//                             <h4 className="font-medium text-gray-700 mb-2"> {/* Adjusted text color */}
//                               {faq.question}
//                             </h4>
//                             <p className="text-gray-600">{faq.answer}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Contact Support */}
//             <div className="mt-10 bg-gray-50 rounded-lg p-6 border border-gray-200"> {/* Adjusted background and border */}
//               <h3 className="text-xl font-semibold mb-3 text-gray-800">Still need help?</h3>
//               <p className="text-gray-700 mb-4">
//                 If you couldn't find what you're looking for, our support team
//                 is here to help.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"> {/* Adjusted button color */}
//                   Contact Support
//                 </button>
//                 <button className="bg-white text-indigo-600 border border-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition-colors"> {/* Adjusted button color */}
//                   Submit a Ticket
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Video Tutorials and Quick Links */}
//           <div>
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Video Tutorials</h2>
//             <div className="space-y-4">
//               {videoTutorials.map((video) => (
//                 <div
//                   key={video.id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
//                 >
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-40 object-cover"
//                   />
//                   <div className="p-4">
//                     <h4 className="font-medium text-lg mb-1 text-gray-800">{video.title}</h4>
//                     <p className="text-gray-500 text-sm mb-2">
//                       {video.duration}
//                     </p>
//                     <p className="text-gray-600 text-sm">{video.description}</p>
//                     <button className="mt-3 text-indigo-600 font-medium text-sm flex items-center"> {/* Adjusted button color */}
//                       Watch Now
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 ml-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 5l7 7-7 7"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Quick Links */}
//             <div className="mt-8">
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Links</h2>
//               <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
//                 <ul className="space-y-2">
//                   <li>
//                     <a
//                       href="#"
//                       className="text-indigo-600 hover:underline flex items-center" // Adjusted link color
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Download Bus Pass Guide
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="text-indigo-600 hover:underline flex items-center" // Adjusted link color
//                     >
//                       <CreditCard className="w-4 h-4 mr-2" />
//                       Payment Methods & Security
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="text-indigo-600 hover:underline flex items-center" // Adjusted link color
//                     >
//                       <Bus className="w-4 h-4 mr-2" />
//                       Route Maps & Information
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="text-indigo-600 hover:underline flex items-center" // Adjusted link color
//                     >
//                       <HelpCircle className="w-4 h-4 mr-2" />
//                       System Requirements
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="text-indigo-600 hover:underline flex items-center" // Adjusted link color
//                     >
//                       <Bell className="w-4 h-4 mr-2" />
//                       Notification Settings Guide
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Help;