import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

export default function Profile() {
  const user = useSelector((store) => store.user);

  return (
  user && (  <div>
      <EditProfile user={user} />
    </div>)
  )
}






// import React from "react";
// import EditProfile from "./EditProfile";
// import { useSelector } from "react-redux";

// export default function Profile() {
//   const user = useSelector((store) => store.user);

//   return (
//     user && (
//       <div className="flex flex-col items-center p-4">
//         <img
//           src={user.profilePicture || "default-profile-picture.jpg"} // Provide a default image
//           alt="Profile"
//           className="rounded-full h-32 w-32 mb-4"
//         />
//         <p className="text-lg font-semibold">Name: {user.name}</p>
//         <p className="text-gray-600">Email: {user.email}</p>
//         {/* Other profile details */}
//         <EditProfile />
//       </div>
//     )
//   );
// }




