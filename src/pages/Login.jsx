import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoMailOutline, IoLockClosedOutline, IoLogoGoogle, IoArrowForwardOutline } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import useSwal from "../Hooks/useSwal";
import useInstance from "../Hooks/useInstance";

const Login = () => {
  const instance = useInstance();
  const { signInUser, googleSignIn } = useAuth();
  const { success } = useSwal();
  const [logInErr, setLogInErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogInSubmit = async (e) => {
    setLogInErr("");
    setIsLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      success("Welcome back! 👋");
      navigate("/");
    } catch (error) {
      setLogInErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const HadleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const crecredential = await googleSignIn();
      const currentUser = crecredential.user;

      const userData = {
        name: currentUser.displayName,
        email: currentUser.email,
        role: "Borrower",
        photoURL: currentUser.photoURL,
      };

      await instance.post("/users", userData);
      success("Welcome 🎉");
      navigate("/");
    } catch (error) {
      setLogInErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg p-6">
      <div className="bg-app-surface p-8 md:p-10 rounded-3xl border border-app-border-subtle shadow-premium w-full max-w-[450px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-app-text tracking-tight mb-2">Welcome Back</h2>
          <p className="text-app-text-secondary">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogInSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-app-text-secondary ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-app-text-muted group-focus-within:text-primary transition-colors">
                <IoMailOutline className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-app-surface border border-app-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-app-text placeholder:text-app-text-muted/50"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-app-text-secondary">
                Password
              </label>
              <Link to="#" className="text-xs font-bold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
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

          {logInErr && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-medium animate-shake">
              {logInErr}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                Sign In
                <IoArrowForwardOutline className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-app-border-subtle"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold">
            <span className="bg-app-surface px-4 text-app-text-muted">Or continue with</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          onClick={HadleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-app-surface hover:bg-app-surface-hover text-app-text border border-app-border font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
        >
          <IoLogoGoogle className="w-5 h-5 text-error" />
          Sign in with Google
        </button>

        <p className="text-center mt-8 text-app-text-secondary font-medium">
          New to LoanLink?{" "}
          <Link 
            className="text-primary font-bold hover:underline" 
            to="/register"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
