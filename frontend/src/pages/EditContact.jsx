import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import editContactImage from "../assets/createContactImage.jpg";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Updated [${userDetails.name}] contact`);
      setUserDetails({ name: "", address: "", email: "", phone: "" });
      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setUserDetails({
          name: result.name,
          email: result.email,
          address: result.address,
          phone: result.phone,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContact();
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <div
          className="flex items-center justify-center mt-[-1rem] w-screen min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${editContactImage})` }}
        >
          <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Edit your contact
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nameInput"
                  className="block text-gray-700 text-xl"
                >
                  Name Of Person
                </label>
                <input
                  type="text"
                  className="form-input mt-1 px-4 py-1 block w-full border-gray-300 rounded-md"
                  id="nameInput"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
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
                  placeholder="WalkStreet 05, California"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="emailInput"
                  className="block text-gray-700 text-xl"
                >
                  Email Of Person
                </label>
                <input
                  type="email"
                  className="form-input mt-1 px-4 py-1 block w-full border-gray-300 rounded-md"
                  id="emailInput"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneInput"
                  className="block text-gray-700 text-xl"
                >
                  Phone Number Of Person
                </label>
                <input
                  type="tel"
                  className="form-input mt-1 px-4 py-1 block w-full border-gray-300 rounded-md"
                  id="phoneInput"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  placeholder="+977 987654321"
                  required
                />
              </div>
              <input
                type="submit"
                value="Save Changes"
                className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition duration-300 w-full"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditContact;
