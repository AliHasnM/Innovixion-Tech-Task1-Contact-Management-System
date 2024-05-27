import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";
import allContactImage from "../assets/allContactImage.jpg";

const AllContact = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/mycontacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Deleted contact");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const newSearchUser = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setContacts(newSearchUser);
  };

  return (
    <div
      className="flex items-center justify-center w-screen mt-[-1rem] min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${allContactImage})` }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4">Your Contacts</h1>
        <a
          href="/mycontacts"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 my-2 inline-block"
        >
          Reload Contact
        </a>
        <hr className="border-gray-300 my-4" />
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? (
              <>
                <h3>No contacts created yet</h3>
                <Link
                  to="/create"
                  className="font-semibold hover:underline text-blue-500"
                >
                  Add Contact
                </Link>
              </>
            ) : (
              <>
                <form className="flex mb-4" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-input flex-grow p-2 rounded border border-gray-300"
                    placeholder="Search Contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ml-2"
                  >
                    Search
                  </button>
                </form>

                <p className="mb-4">
                  Your Total Contacts: <strong>{contacts.length}</strong>
                </p>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-200">Name</th>
                      <th className="py-2 px-4 bg-gray-200">Address</th>
                      <th className="py-2 px-4 bg-gray-200">Email</th>
                      <th className="py-2 px-4 bg-gray-200">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <td className="border py-2 px-4">{contact.name}</td>
                        <td className="border py-2 px-4">{contact.address}</td>
                        <td className="border py-2 px-4">{contact.email}</td>
                        <td className="border py-2 px-4">{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="px-16 w-screen border-none"
      >
        <Modal.Header closeButton className="border-b-2 border-gray-300">
          <Modal.Title className="text-2xl font-semibold px-8 py-3">
            {modalData.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-6">
          <h3 className="text-lg font-bold">{modalData.name}</h3>
          <p className="mt-2">
            <strong>Address:</strong> {modalData.address}
          </p>
          <p className="mt-2">
            <strong>Email:</strong> {modalData.email}
          </p>
          <p className="mt-2">
            <strong>Phone Number:</strong> {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer className="flex justify-end gap-4 border-t-2 border-gray-300 p-4">
          <Link
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            to={`/edit/${modalData._id}`}
          >
            Edit
          </Link>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllContact;
