import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useSecureInstance";
import useSwal from "../../Hooks/useSwal";
import { FaUser, FaEnvelope, FaShieldAlt, FaCamera, FaSave, FaTimes } from "react-icons/fa";
import useImgbb from "../../reuseabble/useImgbb";

const Profile = () => {
  const { user, updateuser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { success, err } = useSwal();
  const imgbbUpload = useImgbb();
  const [dbUser, setDbUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const url = await imgbbUpload(file);
        setFormData({ ...formData, image: url });
        success("Image uploaded successfully!");
      } catch (error) {
        err("Failed to upload image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get("/user");
        setDbUser(res.data);
        setFormData({
          name: res.data?.name || user?.displayName || "",
          image: res.data?.image || user?.photoURL || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (user?.email) {
      fetchUser();
    }
  }, [axiosSecure, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Update Firebase Profile
      await updateuser({
        displayName: formData.name,
        photoURL: formData.image,
      });

      // 2. Update Database Profile
      await axiosSecure.patch("/update-user", {
        name: formData.name,
        image: formData.image,
      });

      success("Profile updated successfully!");
      setIsEditing(false);
      // Refresh local state
      setDbUser({ ...dbUser, name: formData.name, image: formData.image });
    } catch (error) {
      err(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-base-content">My Profile</h2>
          <p className="text-base-content/50 mt-1">View and manage your account information.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="card-modern overflow-hidden bg-base-100 border border-base-content/5">
        {/* Profile Header Background */}
        <div className="h-32 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)]"></div>
        </div>

        <div className="px-8 pb-8">
          <div className="relative -mt-16 flex flex-col items-center md:items-start gap-6 mb-8">
            <div className="relative group">
              <img
                src={isEditing ? (formData.image || "https://i.ibb.co/2kRzZ6q/user.png") : (user?.photoURL || "https://i.ibb.co/2kRzZ6q/user.png")}
                alt="Profile"
                className="w-32 h-32 rounded-3xl object-cover border-4 border-base-100 shadow-xl"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <FaCamera className="text-white text-2xl" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left pt-2">
              <h3 className="text-2xl font-bold text-base-content">
                {user?.displayName || "User"}
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-1">
                <p className="text-base-content/50 font-medium flex items-center gap-1">
                  <FaEnvelope className="text-xs" /> {user?.email}
                </p>
                <span className="hidden md:inline w-1 h-1 bg-base-content/20 rounded-full"></span>
                <span className="badge badge-primary badge-sm rounded-lg font-bold uppercase tracking-wider h-6">
                  {dbUser?.role || "User"}
                </span>
              </div>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6 pt-6 border-t border-base-content/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Full Name</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/30">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Profile Photo</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full focus:file-input-primary rounded-xl"
                      onChange={handleImageChange}
                      accept="image/*"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className={`btn btn-primary rounded-xl px-8 flex items-center gap-2 ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  <FaSave /> {loading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost rounded-xl px-8 flex items-center gap-2"
                  disabled={loading}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-base-content/5">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/30">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FaShieldAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Account Role</p>
                    <p className="font-bold text-base-content capitalize">{dbUser?.role || "Loading..."}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/30">
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
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/30">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Email Verified</p>
                    <p className="font-bold text-base-content">{user?.emailVerified ? "Confirmed" : "Pending Verification"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/30">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <FaUser className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-base-content/30 tracking-wider">Auth Provider</p>
                    <p className="font-bold text-base-content capitalize">{user?.providerData?.[0]?.providerId || "Email/Password"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
