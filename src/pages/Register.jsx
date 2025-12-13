import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useInstance from "../Hooks/useInstance";
import useAuth from "../Hooks/useAuth";
import useSwal from "../Hooks/useSwal";
import Loadding from "../components/Loadding";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateuser } = useAuth();
  const { success } = useSwal();
  const instance = useInstance();
  const [Rloadding, setRloadding] = useState(false);
  const [registerErr, setRegisterErr] = useState("");

  const photoUpload = async (photo) => {
    const formData = new FormData();
    formData.append("image", photo);

    const imageRes = await axios.post(
      "https://api.imgbb.com/1/upload?key=2eeacd821823a9da5e1e0aaef34f237d",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return imageRes.data.data.url;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterErr("");
    setRloadding(true);
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const photo = form.photo.files[0];

    if (password.length < 6) {
      setRloadding(false);
      return setRegisterErr("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      setRloadding(false);

      return setRegisterErr("Password must have at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      setRloadding(false);

      return setRegisterErr("Password must have at least one lowercase letter");
    }

    try {
      // 1️⃣ Upload image to ImgBB

      const userphoto = await photoUpload(photo);
      if (!userphoto) {
        setRloadding(false);
        return setRegisterErr("select a photo");
      }

      // 2️⃣ Create Firebase user
      await createUser(email, password)
        .then(() => {
          // 3️⃣ Update Firebase Profile (VERY IMPORTANT)

          success("Well Come");
          navigate("/");
        })
        .catch((err) => {
          setRegisterErr(err.message);
        });
      await updateuser({
        displayName: name,
        photoURL: userphoto,
      });

      const userData = { name, email, role, photoURL: userphoto };
      await instance.post("/users", userData);

      console.log("User Registered Successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setRloadding(false);
    }
  };

  if (Rloadding) return <Loadding></Loadding>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Photo</label>

            <input
              name="photo"
              type="file"
              className="file-input file-input-neutral"
            />
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Browsers</legend>
              <select
                name="role"
                defaultValue="Pick a browser"
                className="select w-full px-4 py-2 border rounded-lg"
              >
                <option disabled={true}>Role</option>
                <option value="borrower">Borrower</option>
                <option value="manager">Manager</option>
              </select>
              <span className="label">Optional</span>
            </fieldset>
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-red-500">{registerErr}</p>
        <p className=" mt-1.5">
          Alrady have an account ?
          <Link className="underline text-blue-500" to="/login">
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
