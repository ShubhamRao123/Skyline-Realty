import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(false);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center mt-3 cursor-pointer"
        />
        <p className="text-sm self-center mt-4">
          {fileUploadError ? (
            <span className="text-rose-900">Error image upload</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-green-900">
              {`Uploading ${filePer}%`} {filePer}%
            </span>
          ) : filePer === 100 ? (
            <span className="text-green-900">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg mt-6"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border rounded-lg p-3 mt-6"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="border rounded-lg mt-6 p-3"
        />
        <button
          // disabled={loading}
          className="bg-slate-800 text-white rounded-lg p-3 uppercase mt-6 hover:opacity-90 disabled:opacity-75"
        >
          {loading ? "Loading..." : "Update"}
        </button>

        <Link
          className="bg-green-900 p-3 rounded-lg uppercase text-center hover:opacity-90 text-white mt-6"
          to={"/create-listing"}
        >
          create listing
        </Link>
      </form>
      <div className=" flex mt-5 justify-between">
        <span
          onClick={handleDeleteUser}
          className="uppercase text-rose-900  cursor-pointer "
        >
          delete account
        </span>
        <span
          onClick={handleSignOut}
          className="uppercase text-rose-900 cursor-pointer"
        >
          sign out
        </span>
      </div>

      <p className="text-green-900 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>

      <button
        onClick={handleShowListings}
        className="text-green-900 text-base w-full uppercase hover:opacity-80"
      >
        Show Listings
      </button>
      <p className="text-rose-900 text-base w-full">
        {showListingError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col">
          <h1 className="text-center mt-10 text-slate-900 font-semibold text-2xl">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex justify-between text-slate-800 text-base uppercase border rounded-lg mt-6 items-center p-3"
            >
              <div className="flex flex-col">
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-40 w-48 object-contain"
                  />
                </Link>
                <Link
                  className="flex-1 font-semibold truncate  hover:underline"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  class="text-rose-700 hover:text-white border border-rose-900 hover:bg-rose-900 focus:ring-4 focus:outline-none focus:ring-rose-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-800 dark:focus:ring-rose-900 uppercase"
                >
                  delete
                </button>
                <button class="text-green-700 hover:text-white border border-green-900 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-900 dark:focus:ring-green-800 uppercase">
                  edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
