import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from 'axios';


function Navbar() {


  const user = useSelector((store) => store.user);
  console.log(user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = async () => {
     try {
       await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
       dispatch(removeUser());
       return navigate("/login");
     } catch (err) {
       // Error logic maybe redirect to error page
       console.error(err);
     }
   };




  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            campusCommute
          </Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end">
              welcome, {user.name}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user profile photo" src={user.profileUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar
