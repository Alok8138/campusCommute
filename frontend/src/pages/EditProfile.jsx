// import React from 'react'

// function EditProfile() {
//   return (
//     <div>EditProfile</div>
//   )
// }

// export default EditProfile








import { useState } from "react";
// import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  
  const [name, setName] = useState(user.name || "");
  // const [enrollment, setEnrollment] = useState(user.firstName);
  //   const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.profileUrl || "");
  const [email, setEmail] = useState(user.email || "");
  const [enrollment, setEnrollment] = useState(user.enrollment || "");
    // const [email, setEmail] = useState(user.email || "");
  //   const [gender, setGender] = useState(user.gender || "");
  //   const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    // console.log(photoUrl);
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          name,
          // photoUrl,
          email,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              //dharmik code profile code 
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Name:</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Email:</span>
                  </div>
                  <input
                    type="text"
                    value={email}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Enrollment:</span>
                  </div>
                  <input
                    type="text"
                    value={ enrollment }
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEnrollment(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                {/* <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label> */}
                {/* <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Enrollment:</span>
                  </div>
                  <input
                    type="text"
                    value={enrollment}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEnrollment(e.target.value)}
                  />
                </label> */}
                {/* <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={email}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label> */}
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        /> */}
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;














