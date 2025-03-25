import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { FaPencilAlt } from "react-icons/fa";

const EditProfile = ({ user }) => {
  const [name, setName] = useState(user.name || "");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [enrollment, setEnrollment] = useState(user.enrollment || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (user.profileUrl && user.profileUrl.data) {
      const binaryData = new Uint8Array(user.profileUrl.data);
      const blob = new Blob([binaryData], { type: "image/jpeg" });
      setPhotoUrl(URL.createObjectURL(blob));
    }
  }, [user.profileUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPhotoUrl(URL.createObjectURL(file));
  };



  const saveProfile = async () => {
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("enrollment", enrollment);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile Update Response:", res?.data);

      dispatch(addUser(res?.data?.data)); // Update Redux store
      setShowToast(true);

      // Fetch updated user data to ensure session remains active
      fetchUser();

      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Axios Error:", err);
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  // Fetch user after update
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res?.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  // const saveProfile = async () => {
  //   setError("");

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("enrollment", enrollment); // Ensure this is sent
  //   if (imageFile) {
  //     formData.append("image", imageFile);
  //   }

  //   try {
  //     const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
  //       withCredentials: true,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     console.log("Response Data:", res?.data); // Debugging log

  //     dispatch(addUser(res?.data?.data));
  //     setShowToast(true);
  //     setTimeout(() => setShowToast(false), 3000);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.response?.data?.message || "Failed to update profile.");
  //   }
  // };


  // const saveProfile = async () => {
  //   setError("");

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("enrollment", enrollment);
  //   if (imageFile) {
  //     formData.append("image", imageFile);
  //   }

  //   try {
  //     const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
  //       withCredentials: true,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     dispatch(addUser(res?.data?.data));
  //     setShowToast(true);
  //     setTimeout(() => setShowToast(false), 3000);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.response?.data?.message || "Failed to update profile.");
  //   }
  // };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10 bg-gray-100 p-8 rounded-lg shadow-lg w-96">
        <div className="w-full">
          <h2 className="text-center text-2xl font-bold text-gray-800">Profile</h2>
          <div className="relative w-24 h-24 mx-auto my-4">
            <img
              src={photoUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-sky-400 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="absolute bottom-0 right-0 bg-black p-2 rounded-full cursor-pointer shadow-md">
              <FaPencilAlt className="text-white" />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Name</label>
            <input
              type="text"
              value={name}
              className="w-full p-2 mb-3 border rounded-lg"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block text-gray-700 text-sm font-bold mb-1 opacity-80">Enrollment</label>
            <input
              disabled={true}
              type="text"
              value={enrollment}
              className="w-full p-2 mb-3 border rounded-lg opacity-80"
            // onChange={(e) => setEnrollment(e.target.value)}
            />

            <label className="block text-gray-700 text-sm font-bold mb-1 opacity-80">Email</label>
            <input
              disabled={true}
              type="text"
              value={email}
              className="w-full p-2 mb-3 border rounded-lg opacity-80"
            // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <div className="flex justify-center mt-4">
            <button className="bg-black text-white px-4 py-2 rounded-lg shadow-md cursor-pointer" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="fixed top-15 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Profile saved successfully.
        </div>
      )}
    </div>
  );
};

export default EditProfile;

