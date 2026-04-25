import { useNavigate } from "react-router-dom";
import useSwal from "../../../Hooks/useSwal";
import useAuth from "../../../Hooks/useAuth";
import { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useSecureInstance";
import { useState } from "react";

const ManagerProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const instanceSercure = useAxiosSecure();
  const { success, err, confirm } = useSwal();
  const [dbUser, setDbUser] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await instanceSercure.get("/user");
        setDbUser(res.data);
      } catch (error) {
        err(error?.response?.data?.message || error.message);
      }
    };
    fetch();
  }, [instanceSercure]);
  const handleLogout = async () => {
    try {
      const result = await confirm("Are you sure you want to logout?");
      if (result.isConfirmed) {
        await logOut();
        success("Logged out successfully");
        navigate("/login");
      }
    } catch {
      err("Failed to logout");
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-base-content">Profile Settings</h2>
        <p className="text-base-content/50 mt-1">Manage your account details and security preferences.</p>
      </div>

      <div className="card-modern overflow-hidden">
        {/* Profile Header Background */}
        <div className="h-32 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 relative">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)]"></div>
        </div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="relative">
              <img
                src={user?.photoURL || "https://i.ibb.co/2kRzZ6q/user.png"}
                alt="Profile"
                className="w-32 h-32 rounded-3xl object-cover border-4 border-base-100 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-base-100 shadow-lg flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 pb-2">
              <h3 className="text-2xl font-bold text-base-content">
                {user?.displayName || "Manager"}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-base-content/50 font-medium">{user?.email}</p>
                <span className="w-1 h-1 bg-base-content/20 rounded-full"></span>
                <span className="badge badge-primary badge-sm rounded-lg font-bold uppercase tracking-wider h-6">
                  {dbUser?.role || 'User'}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
               <button onClick={handleLogout} className="btn btn-ghost text-error hover:bg-error/10 rounded-xl px-6">Sign Out</button>
               <button className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/20">Edit Profile</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-base-content/5">
            <div className="space-y-6">
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Account Role</p>
                    <p className="font-bold text-base-content capitalize">{dbUser?.role || 'Loading...'}</p>
                  </div>
               </div>

               <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/50">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Account Status</p>
                    <p className="font-bold text-success">Verified & Active</p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/50">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Email Verified</p>
                    <p className="font-bold text-base-content">{user?.emailVerified ? "Confirmed" : "Pending Verification"}</p>
                  </div>
               </div>

               <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/50">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Auth Provider</p>
                    <p className="font-bold text-base-content capitalize">{user?.providerData?.[0]?.providerId || 'Email/Password'}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
