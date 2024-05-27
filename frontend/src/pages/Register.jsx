// Register.jsx
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please enter all the required fields!");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password does not match!");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  return (
    <div className="bg-violet-800 w-1/2 md:w-96 md:py-10 m-auto px-5 rounded-md py-4 tracking-tight">
      <h3 className="text-3xl mb-4 text-violet-100 text-center">
        Create your account
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group flex flex-col gap-1 m-auto w-72 text-xl">
          <label htmlFor="nameInput" className="form-label mt-4 text-violet-50">
            Your Name
          </label>
          <input
            type="text"
            className="form-control rounded-md px-2 md:px-4 md:py-1"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="Ali Hassan"
            required
          />
        </div>
        <div className="form-group flex flex-col gap-1 m-auto w-72 text-xl">
          <label
            htmlFor="emailInput"
            className="form-label mt-4 text-violet-50"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control rounded-md px-2 md:px-4 md:py-1"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="ali@example.com"
            required
          />
        </div>
        <div className="form-group flex flex-col gap-1 m-auto w-72 text-xl">
          <label
            htmlFor="passwordInput"
            className="form-label mt-4 text-violet-50"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-md px-2 md:px-4 md:py-1"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="form-group flex flex-col gap-1 m-auto w-72 text-xl">
          <label
            htmlFor="confirmPassword"
            className="form-label mt-4 text-violet-50"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control rounded-md px-2 md:px-4 md:py-1"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="flex items-center justify-center mt-4 text-xl">
          <input
            type="submit"
            value="Register"
            className="btn btn-primary my-3 bg-violet-500 hover:bg-violet-400 text-violet-50 rounded-md px-5 py-1 cursor-pointer"
          />
        </div>
        <div>
          <p className="text-violet-50 text-sm text-center">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="cursor-pointer underline hover:text-blue-400"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
