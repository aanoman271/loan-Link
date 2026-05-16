import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoCloudUploadOutline, 
  IoShieldCheckmarkOutline,
  IoChevronForwardOutline,
  IoImageOutline
} from "react-icons/io5";
import useInstance from "../Hooks/useInstance";
import useAuth from "../Hooks/useAuth";
import useSwal from "../Hooks/useSwal";
import Lodding from "../components/Lodding";
import useImgbb from "../reuseabble/useImgbb";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateuser } = useAuth();
  const { success } = useSwal();
  const instance = useInstance();
  const [Rloadding, setRloadding] = useState(false);
  const [registerErr, setRegisterErr] = useState("");
  const imgbbUpload = useImgbb();

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
      if (!photo) {
        setRloadding(false);
        return setRegisterErr("Please select a profile photo");
      }
      const userphoto = await imgbbUpload(photo);

      await createUser(email, password);
      await updateuser({
        displayName: name,
        photoURL: userphoto,
      });

      const userData = { name, email, role, photoURL: userphoto };
      await instance.post("/users", userData);
      
      success("Welcome to LoanLink! 🎉");
      navigate("/");
    } catch (error) {
      setRegisterErr(error.message);
    } finally {
      setRloadding(false);
    }
  };

  if (Rloadding) {
    return (
      <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-6">
        <Lodding />
        <p className="mt-4 text-app-text-muted font-medium animate-pulse">Creating your account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg p-6 py-12">
      <div className="bg-app-surface p-8 md:p-10 rounded-3xl border border-app-border-subtle shadow-premium w-full max-w-[500px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-app-text tracking-tight mb-2">Join LoanLink</h2>
          <p className="text-app-text-secondary">Start your financial journey with us today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-app-text-secondary ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-app-text-muted group-focus-within:text-primary transition-colors">
                <IoPersonOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="name"
                required
                className="w-full pl-11 pr-4 py-3 bg-app-surface border border-app-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-app-text placeholder:text-app-text-muted/50"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-app-text-secondary ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-app-text-muted group-focus-within:text-primary transition-colors">
                <IoMailOutline className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-app-surface border border-app-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-app-text placeholder:text-app-text-muted/50"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-app-text-secondary ml-1">Profile Photo</label>
              <div className="relative group">
                <input
                  name="photo"
                  type="file"
                  required
                  className="hidden"
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload"
                  className="flex items-center gap-2 w-full pl-4 pr-4 py-3 bg-app-surface border border-app-border rounded-2xl cursor-pointer hover:border-primary transition-all text-app-text-secondary text-sm overflow-hidden whitespace-nowrap"
                >
                  <IoImageOutline className="w-5 h-5 flex-shrink-0 text-app-text-muted" />
                  <span className="truncate">Choose image...</span>
                </label>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-app-text-secondary ml-1">Account Role</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-app-text-muted group-focus-within:text-primary transition-colors">
                  <IoShieldCheckmarkOutline className="w-5 h-5" />
                </div>
                <select
                  name="role"
                  required
                  className="w-full pl-11 pr-10 py-3 bg-app-surface border border-app-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-app-text appearance-none"
                >
                  <option value="Borrower">Borrower</option>
                  <option value="Manager">Manager</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-app-text-muted">
                  <IoChevronForwardOutline className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-app-text-secondary ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-app-text-muted group-focus-within:text-primary transition-colors">
                <IoLockClosedOutline className="w-5 h-5" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="w-full pl-11 pr-4 py-3 bg-app-surface border border-app-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-app-text placeholder:text-app-text-muted/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {registerErr && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-medium animate-shake">
              {registerErr}
            </div>
          )}

          <button
            type="submit"
            className="w-full group bg-primary hover:bg-primary-focus text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-2 active:scale-95 mt-4"
          >
            Create Account
            <IoChevronForwardOutline className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="text-center mt-8 text-app-text-secondary font-medium">
          Already have an account?{" "}
          <Link 
            className="text-primary font-bold hover:underline" 
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
