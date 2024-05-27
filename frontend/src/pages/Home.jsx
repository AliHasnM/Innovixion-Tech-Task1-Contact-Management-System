import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import bgImage from "../assets/bg.jpg"; // Make sure the path to the image is correct

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  return (
    <div
      className="flex items-center mt-[-1rem] justify-center w-screen min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-75 shadow-lg rounded-lg p-6 max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome {user ? user.name : null}
        </h1>
        <hr className="border-gray-300 my-4" />
        <div>
          <p className="py-2 px-2 tracking-tight">
            Welcome to our Contact Management System! Our user-friendly platform
            allows you to effortlessly manage your contacts with top-notch
            security. Enjoy seamless organization, easy communication, and peace
            of mind knowing your data is protected. Join us today and experience
            reliable, secure contact management.
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            to="/create"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Add Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
