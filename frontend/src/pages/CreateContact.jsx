import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import createContactImage from "../assets/createContactImage.jpg";

const CreateContact = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`Created [${userDetails.name}] contact`);
      setUserDetails({ name: "", address: "", email: "", phone: "" });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div
      className="flex items-center justify-center mt-[-1rem] w-screen min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${createContactImage})` }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create your contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nameInput" className="block text-gray-700 text-xl">
              Name Of Person
            </label>
            <input
              type="text"
              className="form-input mt-1 px-4 py-1 block w-full border-gray-300 rounded-md"
              id="nameInput"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              placeholder="Ali Hassan"
              required
            />
          </div>
          <div>
            <label
              htmlFor="addressInput"
              className="block text-gray-700 text-xl"
            >
              Address Of Person
            </label>
            <input
              type="text"
              className="form-input mt-1 px-4 py-1 block w-full border-gray-300 rounded-md"
              id="addressInput"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              placeholder="Burewala City, Pakistan"
              required
            />
          </div>
          <div>
            <label htmlFor="emailInput" className="block text-gray-700 text-xl">
              Email Of Person
            </label>
            <input
              type="email"
              className="form-input mt-1 px-4 py-1 block w-full border-gray-300 rounded-md"
              id="emailInput"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="ali@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneInput" className="block text-gray-700 text-xl">
              Phone Number Of Person
            </label>
            <input
              type="number"
              className="form-input mt-1 px-4 py-1 block w-full border-gray-300 rounded-md"
              id="phoneInput"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              placeholder="+92 3078357370"
              required
            />
          </div>
          <input
            type="submit"
            value="Add Contact"
            className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition duration-300 w-full"
          />
        </form>
        <div className="text-center mt-4">
          <Link
            to="/mycontacts"
            className="text-blue-500 hover:underline font-semibold"
          >
            See All Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
