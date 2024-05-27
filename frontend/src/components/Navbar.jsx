import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Navbar = ({ title = "CMS" }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-cyan-800 py-5 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-cyan-100 text-xl font-bold">
          {title}
        </Link>
        <button
          className="text-cyan-100 md:hidden"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/1000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div
          className={`h-4 md:flex md:items-center ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbarColor01"
        >
          <ul className="flex flex-col gap-[15px] bg-cyan-900 md:bg-cyan-800 rounded-md md:flex-row justify-center items-center md:space-x-2 mt-4 md:mt-0">
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/create"
                    className="text-cyan-100 hover:bg-cyan-700 font-semibold py-2 px-[3rem] md:px-6 rounded-md"
                  >
                    Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mycontacts"
                    className="text-cyan-100 hover:bg-cyan-700 font-semibold py-2 px-[3rem] md:px-6 rounded-md"
                  >
                    All Contacts
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logged out.");
                    navigate("/login", { replace: true });
                  }}
                >
                  <button className=" text-cyan-100 font-semibold bg-red-700 py-2 px-[2.9rem] md:px-6 rounded-md hover:bg-red-600">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="text-cyan-100 font-semibold py-2 px-[2rem] md:px-6 rounded-md hover:bg-cyan-700"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="text-cyan-100 font-semibold py-2 px-6 rounded-md hover:bg-cyan-700"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
